import React, { useState } from "react";
import axios from 'axios';
import SingleResults from "../Single/SingleResults";
import Loading from "../Loading/Loading";
import { useRouter } from 'next/router'

const HomeSingle = ({ homepage }) => {
  const router = useRouter();

  const submit = async () => {
    if (htno.length != 10) {
      setWarning("The Hall Ticket Should be 10 digits")
    }
    else {
      setWarning()
    }
    homepage(<Loading />)
    const response = await axios.get('https://jntuhresults.up.railway.app/api/single?htno=' + htno, { mode: 'cors' });
    if (response.status == 500) {
      homepage(<><div className="text-[300%]">{response.status} | Server Error</div></>)
    }
    else if (response.status == 404 || response.status == 400) {
      homepage(<><div className="text-[300%]">{response.status} | 404 page Not Found</div></>)
    }
    else {
      // router.push('/single?htno=' + htno)
      // console.log("calling")
       homepage(<SingleResults query={response.data}/>)
    }
  }
  const inputEvent = (event) => {
    event.target.value = event.target.value.toUpperCase();
    setHtno(event.target.value)
  }


  const [htno, setHtno] = useState("");
  const [warning, setWarning] = useState();
  return (
    <>
      <div method="get" className="mx-[0.25%] border-[3px] rounded-md border-black border-solid">
        <center>
          <br />
          <h2 className="font-normal leading-normal mt-0 mb-2 font-bold mx-2 text-[1xl] sm:text-2xl">
            Grades of All Semesters of Particular Student
          </h2>
          <br />
          <br />
          <input name="htno" onChange={inputEvent} className="border-[1px] m-[9.8px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] md:m-0" type="text" maxLength="10" placeholder="Enter your Roll Number" />
          <br />
          <p className="text-[60%] text-red-600">{warning}</p>
          <br />
          <br />
          <button type="submit" onClick={submit} className="w-[70px] text-white	bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >
            Results
          </button>
          <br />
          <br />
        </center>
      </div>
    </>
  )
}
export default HomeSingle