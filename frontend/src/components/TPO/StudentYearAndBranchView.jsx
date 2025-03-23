import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import StudentTable from './StudentTableTemplate';
import { BASE_URL } from '../../config/config';
import AccordionPlaceholder from '../AccordionPlaceholder';

function StudentYearAndBranchView() {
  document.title = 'BIET | All Students';

  const [loading, setLoading] = useState(true);

  const [firstYearComputer, setFirstYearComputer] = useState([]);
  const [firstYearCivil, setFirstYearCivil] = useState([]);
  const [firstYearElectrical, setFirstYearElectrical] = useState([]);
  const [firstYearMechanical, setFirstYearMechanical] = useState([]);

  const [secondYearComputer, setSecondYearComputer] = useState([]);
  const [secondYearCivil, setSecondYearCivil] = useState([]);
  const [secondYearElectrical, setSecondYearElectrical] = useState([]);
  const [secondYearMechanical, setSecondYearMechanical] = useState([]);

  const [thirdYearComputer, setThirdYearComputer] = useState([]);
  const [thirdYearCivil, setThirdYearCivil] = useState([]);
  const [thirdYearElectrical, setThirdYearElectrical] = useState([]);
  const [thirdYearMechanical, setThirdYearMechanical] = useState([]);

  const [fourthYearComputer, setFourthYearComputer] = useState([]);
  const [fourthYearCivil, setFourthYearCivil] = useState([]);
  const [fourthYearElectrical, setFourthYearElectrical] = useState([]);
  const [fourthYearMechanical, setFourthYearMechanical] = useState([]);

  const fetchStudentsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/student/all-students-data-year-and-branch`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      setFirstYearComputer(response.data.firstYearComputer);
      setFirstYearCivil(response.data.firstYearCivil);
      setFirstYearElectrical(response.data.firstYearElectrical);
      setFirstYearMechanical(response.data.firstYearMechanical);

      setSecondYearComputer(response.data.secondYearComputer);
      setSecondYearCivil(response.data.secondYearCivil);
      setSecondYearElectrical(response.data.secondYearElectrical);
      setSecondYearMechanical(response.data.secondYearMechanical);

      setThirdYearComputer(response.data.thirdYearComputer);
      setThirdYearCivil(response.data.thirdYearCivil);
      setThirdYearElectrical(response.data.thirdYearElectrical);
      setThirdYearMechanical(response.data.thirdYearMechanical);

      setFourthYearComputer(response.data.fourthYearComputer);
      setFourthYearCivil(response.data.fourthYearCivil);
      setFourthYearElectrical(response.data.fourthYearElectrical);
      setFourthYearMechanical(response.data.fourthYearMechanical);

    } catch (error) {
      console.log("Error fetching students ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudentsData();
  }, []);

  return (
    <>
      {
        loading ? (
          <AccordionPlaceholder />
        ) : (
          <div className="my-4 p-6">
            <Accordion defaultActiveKey={['1']} flush className='flex flex-col gap-4'>
              {["Fourth", "Third", "Second", "First"].map((year, index) => (
                <Accordion.Item key={index} eventKey={(index + 1).toString()} className='backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400'>
                  <Accordion.Header>{`${year} Year`}</Accordion.Header>
                  <Accordion.Body>
                    <Accordion flush className='flex flex-col gap-2'>
                      <StudentTable branchName={"Computer"} studentData={eval(`${year.toLowerCase()}YearComputer`)} />
                      <StudentTable branchName={"Civil"} studentData={eval(`${year.toLowerCase()}YearCivil`)} />
                      <StudentTable branchName={"Electrical"} studentData={eval(`${year.toLowerCase()}YearElectrical`)} />
                      <StudentTable branchName={"Mechanical"} studentData={eval(`${year.toLowerCase()}YearMechanical`)} />
                    </Accordion>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        )
      }
    </>
  );
}

export default StudentYearAndBranchView;
