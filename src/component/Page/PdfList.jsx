
  import { useGetAllpdfRequest } from "../../hooks/api/useGetAllpdfRequest";

const PdfList = () => {
  const { data: pdf, isFetching, isSuccess, error } = useGetAllpdfRequest();

  if (isFetching) return <p>Loading PDFs...</p>;
  if (error) return <p>Error loading PDFs!</p>;

  return (
    <>
         <h1 className="text-2xl font-bold mb-4 text-center mt-12">All PDFs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
 
      {isSuccess && pdf?.length > 0 ? (
        pdf.map((item) => (
          <div key={item._id} className="bg-gray-900 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{item.subject}</h3>
            <p>{item.branch} | {item.year} | {item.semester}</p>
            <p>Exam: {item.examType} ({item.pyqYear})</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mt-2">
              View / Download
            </button>
          </div>
        ))
      ) : (
        <p>No PDFs found</p>
      )}
    </div>
    </>

  );
};

export default PdfList;
