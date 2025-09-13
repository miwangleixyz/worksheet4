import React from "react";
import axios from "axios";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {
  // 更新文章状态的方法
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`http://localhost:3000/articles/${id}/status`, { status });
      alert(`Article marked as ${status} successfully!`);
      window.location.reload(); // 刷新页面以显示最新数据
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("❌ Failed to update status");
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{header.label}</th>
          ))}
          <th>Actions</th> {/* 操作列 */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {headers.map((header) => (
              <td key={header.key}>{row[header.key]}</td>
            ))}
            <td>
              <button onClick={() => updateStatus(row.id, "approved")}>
                Approve
              </button>
              <button onClick={() => updateStatus(row.id, "rejected")}>
                Reject
              </button>
              <button onClick={() => updateStatus(row.id, "analysed")}>
                Analyse
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
