import React, { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import "./ExcelReader.css";
import { domain, endpoints } from "../api";

interface RowData {
  [key: string]: string | number | null | undefined;
}

const ExcelReader: React.FC = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [filename, setfileName] = useState("");
  const [migratedUser, setMigratedUser] = useState(0);

  let keys = [
    "bebu",
    "abethu",
    "bhoju",
    "chorchuri",
    "cineuns",
    "kannadaflix",
    "keeflix",
    "kidullan",
    "kooku",
    "olaple",
    "rokkt",
    "sonadoll",
    "ubeetu",
  ];
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const imageColumns = [
    "video_image_mobile",
    "banner_image",
    "square_image",
    "mobile_banner_image",
    "trailer_subtitle",
    "default_image",
    "mobile_image",
    "browse_image",
    "video_gif_image",
    "video_image_mobile",
    "banner_image",
    "square_image",
    "mobile_banner_image",
  ];

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setfileName(file?.name ?? "");
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const binaryStr = event.target?.result;
      if (typeof binaryStr !== "string") return;

      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json<RowData>(sheet, {
        defval: null,
      });
      setData(parsedData);
    };

    reader.readAsBinaryString(file);
  };

  const handleImageUpload = (row: RowData, key: string) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("row_id", row.id?.toString() || "");
        formData.append("column", key);

        try {
          const response = await fetch("http://localhost:8080/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          console.log("Image uploaded successfully:", result);

          if (result.imageUrl) {
            let index = data.findIndex((e) => e.unique_id == row.unique_id);

            row[key] = result.imageUrl;
            data[index] = row;

            setData([...data]);

            console.log(row);
          }
          console.log(data);
        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          setIsUploading(false);
        }
      }
    };
    fileInput.click();
  };

  const handleInsertToDB = async (row: RowData, platform: string) => {
    try {
      const response = await fetch(domain + endpoints.insertusers, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: row, platform, filename }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      return result;
      console.log("Data inserted successfully:", result);
      // You can add further actions here, like updating UI or state
    } catch (error) {
      console.error("Error inserting data:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  async function migrate() {
    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      let response = await handleInsertToDB(user, selectedOption);

      if (response.status) {
        setMigratedUser((migratedUser) => migratedUser + 1);
      }
    }

    if(migratedUser == data.length) {
      alert("Migration Completed");
      window.location.reload();
    }
  }

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      <br />
      <br />

      {data.length > 0 && (
        <>
          <div>
            <select value={selectedOption} onChange={handleChange}>
              <option value="" disabled>
                Select Platform
              </option>
              {keys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <br />
          <button
            onClick={() => {
              migrate();
            }}
          >
            Migrate Users
          </button>
          <br />

          {`${migratedUser}/${data.length}`}
        </>
      )}
      {data.length > 0 && (
        <table className="excel-table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={`${row.id}-${JSON.stringify(row)}`}>
                {Object.entries(row).map(([key, value], cellIndex) => (
                  <td key={cellIndex}>
                    {row[key] ? (
                      // Render value if the value exists
                      String(value)
                    ) : imageColumns.includes(key) ? (
                      // Render button for image upload if the key is in imageColumns
                      <button
                        className="upload-image-button"
                        onClick={() => handleImageUpload(row, key)}
                        disabled={isUploading}
                      >
                        Upload Image
                      </button>
                    ) : (
                      // Empty fragment if neither condition is met
                      <></>
                    )}
                  </td>
                ))}
                {/* <td>
                  <button
                    className="insert-db-button"
                    onClick={() => handleInsertToDB(row)}
                  >
                    Insert to DB
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelReader;
