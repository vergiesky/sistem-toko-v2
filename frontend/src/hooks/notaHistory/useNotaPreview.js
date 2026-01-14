import { useState } from 'react';

const useNotaPreview = () => {
  const [previewNota, setPreviewNota] = useState(null);
  const [previewZoom, setPreviewZoom] = useState(1.18);

  const openPreview = (nota) => {
    setPreviewNota(nota);
  };

  const closePreview = () => {
    setPreviewNota(null);
  };

  const zoomOut = () => {
    setPreviewZoom((prev) => Math.max(0.9, prev - 0.1));
  };

  const resetZoom = () => {
    setPreviewZoom(1);
  };

  const zoomIn = () => {
    setPreviewZoom((prev) => Math.min(1.6, prev + 0.1));
  };

  return {
    previewNota,
    previewZoom,
    openPreview,
    closePreview,
    zoomIn,
    zoomOut,
    resetZoom,
  };
};

export default useNotaPreview;
