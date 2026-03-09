import { useState, useRef, useMemo } from "react";
import { useDeleteDocumentMutation, useGetMyDocumentsQuery } from "../features/slices/documentSlice";
import LoadingElement from "../components/LoadingElement";
import { toast } from "react-toastify";
import DocumentTable from "../components/MyDocument/DocumentTable";
import DocumentDeleteDialog from "../components/MyDocument/DocumentDeleteDialog";
import { IoSearchOutline } from "react-icons/io5";
import DocumentSearch from "../components/MyDocument/DocumentSearch";

const MyDocument = () => {

  //API Calls

  const { data, isLoading } = useGetMyDocumentsQuery();    //fetch documents
  const [deleteDocument, { isLoading: isDeleting }] = useDeleteDocumentMutation(); //delete documents


  //states

  const [searchTerm, setSearchTerm] = useState(""); //search box
  const [targetDoc, setTargetDoc] = useState(null); //select doc

  const deleteModalRef = useRef(null); //delete dialog ref


  const documents = data?.data || []; // Array of documents



  // Filter logic for search

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) =>
      doc.docUrl?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [documents, searchTerm]);


  //open delete modal

  const openDeleteModal = (doc) => {
    setTargetDoc(doc);
    deleteModalRef.current?.showModal();
  };


  //close delete modal
  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
    setTargetDoc(null);
  };


  //handle delete
  const confirmDelete = async () => {
    if (!targetDoc) return;
    try {
      await deleteDocument(targetDoc.id).unwrap();
      toast.success("Document permanently removed");
      closeDeleteModal();
    } catch (err) {
      toast.error("Deletion failed. Try again.");
    }
  };

  if (isLoading) return <LoadingElement />;

  return (
    <div className="min-h-screen w-full bg-back p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header with Search */}
        
        <DocumentSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Table Card */}
        <div className="bg-white shadow-xl shadow-text/5 rounded-3xl overflow-hidden border border-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50 text-text/40 text-[11px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-5">Format</th>
                  <th className="px-4 py-5 text-center sm:text-left">
                    Document Details
                  </th>
                  <th className="px-6 py-5 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDocs.map((doc) => (
                  <DocumentTable
                    key={doc.id}
                    doc={doc}
                    openDeleteModal={openDeleteModal}
                  />
                ))}
              </tbody>
            </table>

            {filteredDocs.length === 0 && (
              <div className="py-24 text-center">
                <div className="bg-back w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-text/20">
                  <IoSearchOutline size={40} />
                </div>
                <h3 className="text-lg font-bold text-text">
                  No documents found
                </h3>
                <p className="text-text/40 text-sm mt-1">
                  Try adjusting your search filters or upload a new file.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <DocumentDeleteDialog
        targetDoc={targetDoc}
        confirmDelete={confirmDelete}
        closeDeleteModal={closeDeleteModal}
        deleteModalRef={deleteModalRef}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default MyDocument;
