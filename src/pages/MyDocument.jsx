import { useState, useRef, useMemo } from "react";
import {
  useDeleteDocumentMutation,
  useGetMyDocumentsQuery,
} from "../features/slices/documentSlice";
import LoadingElement from "../components/ui/LoadingElement";
import { toast } from "react-hot-toast";
import DocumentTable from "../components/MyDocument/DocumentTable";
import { IoSearchOutline } from "react-icons/io5";
import DocumentSearch from "../components/MyDocument/DocumentSearch";
import DeleteDialog from "../components/Dialog/DeleteDialog";
import { motion } from "framer-motion";

const MyDocument = () => {
  //fetch documents
  const { data, isLoading } = useGetMyDocumentsQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });

  //delete documents
  const [deleteDocument, { isLoading: isDeleting }] =
    useDeleteDocumentMutation();

  //states
  const [searchTerm, setSearchTerm] = useState(""); //search box
  const [targetDoc, setTargetDoc] = useState(null); //select doc

  const deleteModalRef = useRef(null); //delete dialog ref
  const dialogRef = useRef(null);

  // Filter logic for search
  const filteredDocs = useMemo(() => {
    const documents = data?.data || [];
    return documents.filter((doc) =>
      doc.docUrl?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data?.data, searchTerm]);

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
      toast.error("Deletion failed. Try again.", err);
    }
  };

  if (isLoading) return <LoadingElement />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full p-3 sm:p-6 lg:p-8 "
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <DocumentSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dialogRef={dialogRef}
        />

        <div className="bg-white dark:bg-gray-900 dark:border-gray-900 shadow-xl shadow-text/5 rounded-2xl sm:rounded-3xl overflow-hidden border border-white">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-separate border-spacing-0 flex flex-col md:table">
              <thead className="hidden md:table-header-group ">
                <tr className="bg-slate-50/80 dark:bg-gray-700 text-text/70 dark:text-white text-[11px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-5 border-b">Format</th>
                  <th className="px-4 py-5 border-b">Document Details</th>
                  <th className="px-6 py-5 border-b">Manage</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 flex flex-col md:table-row-group">
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
              <div className="py-20 lg:py-24 text-center px-4">
                <div className="bg-back dark:bg-gray-900 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-text/20 dark:text-gray-500">
                  <IoSearchOutline className="size-8 sm:size-10" />
                </div>
                <h3 className="text-lg font-bold text-text dark:text-white">
                  No documents found
                </h3>
                <p className="text-text/40 text-sm mt-1 dark:text-gray-500">
                  Try adjusting your search filters or upload a new file.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteDialog
        targetElement={targetDoc}
        confirmDelete={confirmDelete}
        closeDeleteModal={closeDeleteModal}
        deleteModalRef={deleteModalRef}
        isDeleting={isDeleting}
      />
    </motion.div>
  );
};

export default MyDocument;
