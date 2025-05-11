// import React, { useState, useCallback } from 'react';
// import { Upload, FileCheck, AlertCircle } from 'lucide-react';
// import Papa from 'papaparse';
// import { createClient } from '@supabase/supabase-js';

// interface WordUpload {
//   arabic: string;
//   bangla: string;
//   english: string;
//   example?: string;
//   difficulty: 'easy' | 'medium' | 'hard';
//   tags: string;
// }

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// const AdminPage: React.FC = () => {
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [preview, setPreview] = useState<WordUpload[]>([]);

//   const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setError(null);
//     setSuccess(null);
    
//     Papa.parse<WordUpload>(file, {
//       header: true,
//       complete: (results) => {
//         if (results.errors.length > 0) {
//           setError('Error parsing CSV file. Please check the format.');
//           return;
//         }
//         setPreview(results.data.slice(0, 5));
//       },
//       error: (error) => {
//         setError(`Error reading file: ${error.message}`);
//       }
//     });
//   }, []);

//   const handleUpload = async () => {
//     if (!preview.length) {
//       setError('No data to upload');
//       return;
//     }

//     setUploading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const { error } = await supabase
//         .from('words')
//         .insert(preview.map(word => ({
//           ...word,
//           tags: word.tags.split(',').map(tag => tag.trim())
//         })));

//       if (error) throw error;

//       setSuccess('Words uploaded successfully!');
//       setPreview([]);
//     } catch (err) {
//       setError('Error uploading words. Please try again.');
//       console.error('Upload error:', err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-white mb-1">Word Management</h1>
//         <p className="text-blue-200">Upload and manage vocabulary words</p>
//       </div>

//       <div className="bg-blue-950 rounded-lg p-6 shadow-lg mb-6">
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold text-white mb-4">Upload Words</h2>
//           <p className="text-blue-300 mb-4">
//             Upload a CSV file with the following columns:
//             <code className="block mt-2 p-3 bg-blue-900 rounded">
//               arabic,bangla,english,example,difficulty,tags
//             </code>
//           </p>

//           <div className="flex items-center justify-center w-full">
//             <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-700 border-dashed rounded-lg cursor-pointer bg-blue-900 hover:bg-blue-800 transition-colors">
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <Upload className="w-8 h-8 mb-3 text-blue-400" />
//                 <p className="mb-2 text-sm text-blue-300">
//                   <span className="font-semibold">Click to upload</span> or drag and drop
//                 </p>
//                 <p className="text-xs text-blue-400">CSV files only</p>
//               </div>
//               <input
//                 type="file"
//                 className="hidden"
//                 accept=".csv"
//                 onChange={handleFileUpload}
//                 disabled={uploading}
//               />
//             </label>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-start">
//             <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
//             <p className="text-red-300">{error}</p>
//           </div>
//         )}

//         {success && (
//           <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg flex items-start">
//             <FileCheck className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
//             <p className="text-green-300">{success}</p>
//           </div>
//         )}

//         {preview.length > 0 && (
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-white mb-3">Preview</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left text-blue-300">
//                 <thead className="text-xs uppercase bg-blue-900">
//                   <tr>
//                     <th className="px-4 py-3">Arabic</th>
//                     <th className="px-4 py-3">Bangla</th>
//                     <th className="px-4 py-3">English</th>
//                     <th className="px-4 py-3">Difficulty</th>
//                     <th className="px-4 py-3">Tags</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {preview.map((word, index) => (
//                     <tr key={index} className="border-b border-blue-900">
//                       <td className="px-4 py-3">{word.arabic}</td>
//                       <td className="px-4 py-3">{word.bangla}</td>
//                       <td className="px-4 py-3">{word.english}</td>
//                       <td className="px-4 py-3">{word.difficulty}</td>
//                       <td className="px-4 py-3">{word.tags}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={handleUpload}
//                 disabled={uploading}
//                 className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
//               >
//                 {uploading ? 'Uploading...' : 'Upload Words'}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;