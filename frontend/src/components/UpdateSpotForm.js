// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { fetchDetailedReport } from '../store/reports';

import SpotForm from "../components/Spots/SpotForm";

const EditReportForm = () => {
  const spot = {};
  //   const { reportId } = useParams();
  //   const report = useSelector((state) =>
  //     state.reports ? state.reports[reportId] : null
  //   );
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(fetchDetailedReport(reportId));
  //   }, [dispatch, reportId]);

  //   if (!report) return(<></>);

  //   /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <div className="components-border">
      <h2>Edit form</h2>
      <SpotForm spot={spot} formType="Create spot" />
    </div>
    //     Object.keys(report).length > 1 && (
    //       <>
    //         <ReportForm
    //           report={report}
    //           formType="Update Report"
    //         />
    //       </>
  );
  //   );
};

export default EditReportForm;
