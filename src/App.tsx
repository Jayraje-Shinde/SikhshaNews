import { useRef, useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import type { IJodit } from "jodit/types";

function extractYouTubeId(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.replace("www.", "");
    let videoId: string | null = null;

    if (host === "youtube.com") {
      if (url.pathname.startsWith("/embed/"))
        videoId = url.pathname.split("/embed/")[1].split("?")[0];
      else if (url.pathname.startsWith("/shorts/"))
        videoId = url.pathname.split("/shorts/")[1].split("?")[0];
      else
        videoId = url.searchParams.get("v");
    } else if (host === "youtu.be") {
      videoId = url.pathname.slice(1).split("?")[0];
    }

    return videoId;
  } catch {
    return null;
  }
}

function cleanJoditOutput(html: string): string {
  return html
    .replace(/<span[^>]*data-jodit-selection_marker[^>]*>[\s\S]*?<\/span>/gi, "")
    .replace(/\uFEFF/g, "")
    .trim();
}

export default function App() {
  const editorRef = useRef<IJodit | null>(null);
  const [content, setContent] = useState("<p>Start writing here...</p>");
  const [output, setOutput] = useState<string | null>(null);

  const config = useMemo(() => ({
    height: 500,
    minHeight: 300,
    defaultMode: 1 as const,
    language: "en",
    spellcheck: true,
    toolbar: true,
    toolbarSticky: true,
    toolbarAdaptive: false,

    buttons: [
      "bold", "italic", "underline", "strikethrough",
      "superscript", "subscript",
      "|",
      "font", "fontsize",
      "|",
      "brush",
      "paragraph",
      "|",
      "left", "center", "right", "justify",
      "|",
      "ul", "ol",
      "indent", "outdent",
      "|",
      "hr",
      "table",
      "link",
      "image",
      "insertYouTube",
      "symbols",
      "|",
      "eraseFormat",
      "find",
      "|",
      "speechRecognize",
      "|",
      "undo", "redo",
      "|",
      "fullsize",
      "preview",
      "source",
      "print",
    ],

    extraButtons: [
      {
        name: "insertYouTube",
        tooltip: "Insert YouTube Video",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.75 15.5V8.5l6.25 3.5-6.25 3.5z"/>
        </svg>`,
        exec(editor: IJodit) {
          const raw = prompt("Paste a YouTube URL:");
          if (!raw) return;

          const videoId = extractYouTubeId(raw);
          if (!videoId) {
            alert("Not a valid YouTube URL. Only YouTube links are accepted.");
            return;
          }

          const iframe = editor.createInside.element("iframe");
          iframe.setAttribute("width", "560");
          iframe.setAttribute("height", "315");
          iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}`);
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allowfullscreen", "true");
          iframe.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          );

          editor.s.insertNode(iframe);
        },
      },
    ],

    allowResizeTags: {
      iframe: false,
      table: true,
      img: true,
    },

    uploader: {
      insertImageAsBase64URI: true,
    },

    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    processPasteHTML: true,
    allowedIframeHostnames: ["www.youtube.com", "youtube.com"],
    placeholder: "Start writing your article…",
  }), []);

  function handleShowOutput() {
    if (!editorRef.current) return;

    const editorArea = editorRef.current.editor;
    const clone = editorArea.cloneNode(true) as HTMLElement;

    clone.querySelectorAll("jodit[data-jodit_iframe_wrapper]").forEach((wrapper) => {
      const iframe = wrapper.querySelector("iframe");
      if (iframe) {
        wrapper.replaceWith(iframe.cloneNode(true));
      } else {
        wrapper.remove();
      }
    });

    setOutput(cleanJoditOutput(clone.innerHTML));
  }

  return (
    <div>
      <h2>Jodit Editor Test</h2>

      <JoditEditor
        ref={editorRef}
        value={content}
        config={config}
        onBlur={(val) => setContent(val)}
      />

      <button onClick={handleShowOutput}>Show HTML Output</button>

      {output !== null && (
        <div>
          <h3>Raw HTML</h3>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {output}
          </pre>

          <h3>Rendered</h3>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      )}
    </div>
  );
}