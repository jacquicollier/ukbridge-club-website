'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function FileUploader() {
  const params = useParams();
  const club = params.club;

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setMessage(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setUploading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/results/${club}/1234`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setMessage(`Upload successful! File: ${result.filename}`);
      setFile(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='mx-auto flex max-w-md flex-col items-center space-y-4 rounded-lg border p-4 shadow-lg'>
      <input
        type='file'
        accept='.xml'
        onChange={handleFileChange}
        className='rounded border p-2'
      />

      {file && (
        <p className='text-sm text-gray-600'>
          Selected file: <strong>{file.name}</strong>
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className={`rounded px-4 py-2 text-white ${
          uploading
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {message && <p className='text-green-600'>{message}</p>}
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  );
}
