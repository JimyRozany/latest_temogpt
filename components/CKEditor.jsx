"use client";

import { useEffect, useRef } from "react";

const CKEditor = ({ value = "", onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const initializeEditor = () => {
      if (typeof window !== "undefined") {
        const editorId = editorRef.current?.id || "editor1";

        // Destroy the existing editor instance if it exists
        if (window.CKEDITOR.instances[editorId]) {
          window.CKEDITOR.instances[editorId].destroy(true);
        }

        // Initialize the CKEditor instance
        const editorInstance = window.CKEDITOR.replace(editorRef.current);

        editorInstance.on("change", () => {
          const data = editorInstance.getData();
          onChange(data);
        });
      }
    };

    if (!window.CKEDITOR) {
      const script = document.createElement("script");
      script.src = "https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"; // Use the latest secure version
      script.onload = initializeEditor;
      document.body.appendChild(script);
    } else {
      initializeEditor();
    }
  }, []);

  return (
    <div className="" dir="rtl">
      <textarea dir="rtl" ref={editorRef} name="editor1" defaultValue={value} />
    </div>
  );
};

export default CKEditor;
