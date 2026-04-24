"use client";


import {
  useDeleteDocumentMutation,
  useGetMyDocumentsQuery,
} from "@/features/slices/documentSlice";

import { useEffect, useMemo, useRef, useState } from "react";

import tourData from "../../../Json data/tourData.json";
import { startTour, setStepIndex } from "@/features/slices/tourSlice"; 


import DocumentSearch from "./components/DocumentSearch";
import { IoSearchOutline } from "react-icons/io5";
import DeleteDialog from "@/components/ui/DeleteDialog";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import DocumentTable from "./components/DocuementTable";
import Loading from "@/app/loading";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "@/features/slices/userSlice";

export default function Documents() {
  const dispatch = useDispatch();
  //states
  const [searchTerm, setSearchTerm] = useState(""); //search box
  const [targetDoc, setTargetDoc] = useState(null); //select doc

  const deleteModalRef = useRef(null); //delete dialog ref
  const dialogRef = useRef(null);

  //fetch documents
  const { data, isLoading } = useGetMyDocumentsQuery();
  const { data: user } = useGetMeQuery();

  const userOnboarding = user?.data?.onboarding?.myDocuments;
  
  const shouldStart = userOnboarding?.status === "pending";

  
  useEffect(() => {
    
    if (tourData?.myDocuments && user && shouldStart) {
      dispatch(
        startTour({
          tourKey: "myDocuments",
          steps: tourData.myDocuments,
          stepIndex: userOnboarding?.lastStep ?? 0,
          run: true,
        }),
      );
    }
  }, [dispatch, tourData, user, shouldStart]);

  //delete documents
  const [deleteDocument, { isLoading: isDeleting }] =
    useDeleteDocumentMutation();

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
      console.log(err);
      toast.error(
        err?.data?.message || "Failed to delete document. Try again.",
      );
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AnimatedWrapper>
        <div className="min-h-screen w-full py-3 sm:py-6 lg:py-8 mx-auto space-y-6">
          <DocumentSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            dialogRef={dialogRef}
          />

          <div
            id="document-table"
            className="bg-surface shadow-sm shadow-text/5 rounded-3xl overflow-hidden border border-white dark:border-none"
          >
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
      </AnimatedWrapper>

      <DeleteDialog
        targetElement={targetDoc}
        confirmDelete={confirmDelete}
        closeDeleteModal={closeDeleteModal}
        deleteModalRef={deleteModalRef}
        isDeleting={isDeleting}
      />
    </>
  );
}
