/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef } from "react";

interface IRichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: IRichTextEditorProps) {
    const editorRef = useRef<{ getInstance: () => any }>(null);

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
            .tox-tinymce-aux {
                z-index: 999999 !important;
            }
            .tox .tox-menu {
                z-index: 999999 !important;
            }
            .tox .tox-collection--list {
                z-index: 999999 !important;
            }
            .tox .tox-dialog {
                z-index: 999999 !important;
            }
            .tox .tox-image-tools {
                z-index: 999999 !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleImageUpload = function (blobInfo: any, progress: any): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const base64Data = blobInfo.base64();
                const mimeType = blobInfo.blob().type;
                const imageUrl = `data:${mimeType};base64,${base64Data}`;
                progress(100);
                resolve(imageUrl);
            } catch (err) {
                console.error(err);
                reject("Không thể xử lý ảnh");
            }
        });
    };

    const handleFilePicker = (callback: (fileUrl: string, meta?: any) => void) => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");

        input.onchange = () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const reader = new FileReader();

                reader.onload = e => {
                    if (e.target && e.target.result) {
                        callback(e.target.result as string, {
                            title: file.name,
                            alt: file.name
                        });
                    }
                };

                reader.readAsDataURL(file);
            }
        };

        input.click();
    };

    return (
        <div className="tinymce-wrapper" style={{ position: "relative", zIndex: 1 }}>
            <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                onInit={(_, editor) => {
                    editorRef.current = { getInstance: () => editor };
                }}
                value={value}
                onEditorChange={onChange}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                        "imagetools"
                    ],
                    toolbar:
                        "undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | image customImagePicker link | removeformat",
                    setup: editor => {
                        editor.ui.registry.addButton("customImagePicker", {
                            text: "Chọn ảnh",
                            icon: "browse",
                            tooltip: "Chọn ảnh từ máy tính",
                            onAction: () => {
                                const input = document.createElement("input");
                                input.setAttribute("type", "file");
                                input.setAttribute("accept", "image/*");

                                input.onchange = () => {
                                    const file = input.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = e => {
                                            if (e.target?.result) {
                                                editor.insertContent(
                                                    `<img src="${e.target.result}" alt="${file.name}" />`
                                                );
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                };

                                input.click();
                            }
                        });
                    },
                    images_upload_handler: handleImageUpload,
                    automatic_uploads: true,
                    image_title: true,
                    paste_data_images: true,
                    file_picker_types: "image",
                    file_picker_callback: handleFilePicker,
                    image_caption: true,
                    image_advtab: true,
                    imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
                    content_style: `
                      body {
                        font-family: Arial, sans-serif;
                        font-size: 14px;
                        line-height: 1.5;
                      }
                      img {
                        max-width: 100%;
                        height: auto;
                      }
                    `
                }}
            />
        </div>
    );
}
