"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

const QuillEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your content here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link", "blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["image"], // Add image button
            ["clean"],
          ],
        },
      });

      quillInstance.current.on("text-change", () => {
        onChange(quillInstance.current?.root.innerHTML || "");
      });
    }

    // Cleanup on unmount to prevent multiple instances
    return () => {
      quillInstance.current?.off("text-change");
      quillInstance.current = null;
    };
  }, [onChange]);

  // Update editor when external value changes
  useEffect(() => {
    if (
      quillInstance.current &&
      value !== quillInstance.current.root.innerHTML
    ) {
      quillInstance.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div ref={editorRef} style={{ height: "300px", borderRadius: "15px" }} />
  );
};

export default QuillEditor;
