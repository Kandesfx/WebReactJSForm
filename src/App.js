import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

const schema = {
  title: "Đăng ký",
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Họ và tên",
      minLength: 3,
    },
    email: {
      type: "string",
      format: "email",
      title: "Email",
    },
    age: {
      type: "integer",
      title: "Tuổi",
      minimum: 18,
    },
    gender: {
      type: "string",
      title: "Giới tính",
      enum: ["Nam", "Nữ", "Khác"],
    },
  },
  required: ["name", "email", "age"],
};

const uiSchema = {
  name: {
    "ui:placeholder": "Nhập họ và tên...",
    "ui:autofocus": true,
  },
  email: {
    "ui:widget": "email",
  },
  age: {
    "ui:widget": "updown",
  },
  gender: {
    "ui:widget": "radio",
  },
};

function App() {
  const handleSubmit = async ({ formData }) => {
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Form Đăng Ký</h2>
      {/* Thêm validator vào Form */}
      <Form schema={schema} uiSchema={uiSchema} onSubmit={handleSubmit} validator={validator} />
    </div>
  );
}

export default App;
