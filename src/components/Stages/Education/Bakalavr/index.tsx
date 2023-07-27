import { Formik, Form, Field } from 'formik'
import { addEducation,addEducationPage,addDataPage } from 'state/dataSlice';
import { useEffect, useState } from "react";
import {GiCancel} from 'react-icons/gi'
import {AiOutlineCheck} from 'react-icons/ai'
import { useSelector } from 'react-redux';
import axios from 'axios'
import {IoMdArrowDropdown} from 'react-icons/io'
import {BsCircle} from 'react-icons/bs'
import '../education.css'
import {
    GeneralQuestionsFormProps
  } from "../GeneralQuestionsForm";
  import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
export type EducationQuestionsFormValues = {
    vocationalScore: string;
    bachelorsScore: string;
    masterScore: string;
    phdScore: string;
  };
  interface Answer {
    id: number;
    answer_title: string;
    answer_weight: number | null;
  
  }
  
  interface Question {
    id: number;
    answers: Answer[];
    question_title: string;
    question_type: "select" | "button" | "input"; 
    question_index: number;
    question_dependens_on_answer: any | null; 
    question_dependens_on_question: any | null; 
  }
  
  interface Stage {
    id: number;
    questions: Question[];
    stage_name: string;
    slug: string;
    stage_index: number | null;
  }
  interface RootState {
    dataa: {
  
      education: [],
      educationID:string,
   
    };
  }
function Bakalavr(){
    const [questionsDatas, setQuestionsDatas] = useState<Question[]>([])
    const education= useSelector((state: RootState) => state.dataa.education);
    const [click,setClick]=useState(false)
    const [field,setField] =useState(false)
    const dispatch: Dispatch = useDispatch();
    const educationId = useSelector((state: RootState) => state.dataa.educationID);

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/question-lists/orta-texniki-ve-ali-tehsil-suallari').then(res => {
        console.log(res.data);     
        setQuestionsDatas(res.data[0]?.questions)
      })
    }, [])
  
    
  return (
    <>
            <Formik
        initialValues={{
          id:0,
          country: '',
          university: '',
          ixtisas:'',
          start:'',
          end:'',
          reading:false,
          meyyarlar:'',
          muraciet:'',
         
            testName:'',
            bal:0,
            maxbal:0,
          Att:false,
          Lan:false,
          GRE:false,
          SAT:false,
          random:'',
          attestat:'',
          ielts:'',
          toffiel:'',
          sat:'',
          elavetestName:'',
          elavebal:0,
          elavemaxbal:0,

        }}

        onSubmit={(values, { resetForm }) => {
          const copy = {
            id:education.length+1,
            country: values.country,
            university:values.university,
            ixtisas:values.ixtisas,
            start:values.start,
            end:values.end,
            reading:values.reading,
            elave:{
              elaveTestName:values.elavetestName,
              elaveBal:values.elavebal,
              elaveMaxbal:values.elavemaxbal
            },
            lokal:{
              testName:values.testName,
              bal:values.bal,
              maxbal:values.maxbal
            },
            attestat:values.attestat,
          ielts:values.ielts,
          toffiel:values.toffiel,
          sat:values.sat

          }
          console.log(copy);
          
          dispatch(addEducation(copy))
          resetForm({});
          if (educationId==='Bakalavr') {
            dispatch(addDataPage(1))
            
          }else{
            dispatch(addEducationPage(1))
          }
    
          
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="form ">
            <div className="form-education ">            
              <label><span>Bakalavr</span> {questionsDatas[0]?.question_title} </label>
                  <Field placeholder='Ölkə' name='country' as='select' className='select'>          
                    <option value='ölkə' className='options'>Ölkə</option>
              {
                questionsDatas[0]?.answers.map((elem, index) => (
               
                     <option value={elem.answer_title} key={index} className='options'>{elem.answer_title}</option>
                  
                 
                ))
              }
            </Field></div>
            <div className="form-education">
              <label>{questionsDatas[1]?.question_title}</label>
              <Field name='university' placeholder='Bakı Dövlət Universiteti'/>
            </div>
            <div className="form-education">
              <label>{questionsDatas[2]?.question_title}</label>
              <Field name='ixtisas' placeholder='Kompüter Elmləri'/>
            </div>
            <div className="form-education">
              <label>{questionsDatas[3]?.question_title}</label>
              <div className="start-end">
                <Field name='start' type='month'/>
                <Field name='end' type='month'/>
              </div>
             
            </div>
            <div className='reading'>
              <label>Hal hazırda oxuyuram</label>
            <Field type='checkbox' name='reading' />
            </div>
            <div className="form-education">
              <label>{questionsDatas[4]?.question_title}</label>
              <div className="meyyar">
                {
                  questionsDatas[4]?.answers?.map((elem,index)=>(
                    <div key={index}>
                      <label>{elem.answer_title}</label>
                      <Field type='radio' name='meyyarlar' value={elem.answer_title}/>
                    </div>
                    
                  ))
                }
              </div>
            </div>
            {
              values.meyyarlar==='Lokal imtahan'?
              <div className="lokal">
              <label>{questionsDatas[5]?.question_title}</label>
              <div className="lokal-inputs">  <Field name='testName' type='text' className='biginp' placeholder='Testin adı'/>
                <Field name='bal' type='number' placeholder='Balınız'/>
                <Field name='maxbal' type='number' placeholder='Maksimal Bal'/></div>
              </div>
              :null
            }
            {
              values.meyyarlar==='Müraciyyət'?
              <div className="muraciet">
                <label>{questionsDatas[6]?.question_title}</label>
                <div className="muraciet-inputs" >
                  <div className="btns">
                    <div>
                    <a onClick={()=>click===true? setClick(false):setClick(true)} className="secin">Attestat-GPA</a>
                    <IoMdArrowDropdown className='icon'/>
                    </div>
                  
                  <a className="elave" onClick={()=> setField(true)}>Əlavə et +</a>
                  </div>
              
                {
                  click===true?  <div className="muraciet-checkboxes">
                  {
                        questionsDatas[6]?.answers.map((elem,index)=>(
                          <div key={index} className="muraciet-checkbox">
                            <label htmlFor={elem.answer_title}>{elem.answer_title}</label>
                            <Field id={elem.answer_title} type='checkbox' name={elem.answer_title.substr(0,3)} />
                          </div>
                       
                        ))
                      }
                  </div>:null
                }
              
                   
                 
               
                </div>
                {
                  field===true? <div className="ttile-check">
                  <div>
                    <label>Seçdiyiniz imtahanın adını,balınızı və max.bal qeyd edin</label>
                    <GiCancel  style={{color:'red'}} onClick={()=> setField(false)}/>
                  </div>
                  <div className="lokal-inputs">  <Field name='elavetestName' type='text' className='biginp' placeholder='Testin adı'/>
                <Field name='elavebal' type='number' placeholder='Balınız'/>
                <Field name='elavemaxbal' type='number' placeholder='Maksimal Bal'/></div>
                </div>:null
                }
                  {
                    values.Att===true?
                    <div className="ttile-check">
                      <div>
                        <label><span>Attestat-GPA</span> üzrə, nəticəni qeyd edin</label>
                        <GiCancel  style={{color:'red'}}/>
                      </div>
                      <Field name='attestat' type='text' placeholder='Nəticə'/>
                    </div>:null
                  }
                                    {
                    values.Lan===true?
                    <div className="ttile-check">
                    <div>
                      <label><span>Language test (IELTS TOEFL)</span> üzrə, nəticəni qeyd edin</label>
                      <GiCancel  style={{color:'red'}}/>
                    </div>
                    <Field name='ielts' type='text' placeholder='İELTS Nəticə'/>
                    <Field name='toffiel' type='text' placeholder='TOFFİEL Nəticə'/>
                  </div>:null
                  }
                  {
                    values.SAT===true?      <div className="ttile-check">
                    <div>
                      <label><span>SAT</span> üzrə, nəticəni qeyd edin</label>
                      <GiCancel style={{color:'red'}} onClick={()=> values.SAT=false}/>
                    </div>
                    <Field name='sat' type='text' placeholder='Nəticə'/>
                  </div>:null
                  }
              </div>:null
              
            }
                     {
              values.meyyarlar==='Hər ikisi'?
              <div>
                 <div className="lokal">
              <label>{questionsDatas[5]?.question_title}</label>
              <div className="lokal-inputs">  <Field name='testName' type='text' className='biginp' placeholder='Testin adı'/>
                <Field name='bal' type='number' placeholder='Balınız'/>
                <Field name='maxbal' type='number' placeholder='Maksimal Bal'/></div>
              </div>
              <div className="muraciet">
                <label>{questionsDatas[6]?.question_title}</label>
                <div className="muraciet-inputs" >
                  <div className="btns">
                    <div>
                    <a onClick={()=>click===true? setClick(false):setClick(true)} className="secin">Secin</a>
                    <IoMdArrowDropdown className='icon'/>
                    </div>
               
                  <a className="elave" onClick={()=> setField(true)}>Əlavə et +</a>
                  </div>
              
                {
                  click===true?  <div className="muraciet-checkboxes">
                  {
                        questionsDatas[6]?.answers.map((elem,index)=>(
                          <div key={index} className="muraciet-checkbox">
                            <label htmlFor={elem.answer_title}>{elem.answer_title}</label>
                            <Field id={elem.answer_title} type='checkbox' name={elem.answer_title.substr(0,3)} />
                          </div>
                       
                        ))
                      }
                  </div>:null
                }
              
                   
                 
               
                </div>
                {
                  field===true? <div className="ttile-check">
                  <div>
                    <label>Seçdiyiniz imtahanın adını,balınızı və max.bal qeyd edin</label>
                    <GiCancel  style={{color:'red'}} onClick={()=> setField(false)}/>
                  </div>
                  <div className="lokal-inputs">  <Field name='elavetestName' type='text' className='biginp' placeholder='Testin adı'/>
                <Field name='elavebal' type='number' placeholder='Balınız'/>
                <Field name='elavemaxbal' type='number' placeholder='Maksimal Bal'/></div>
                </div>:null
                }
                  {
                    values.Att===true?
                    <div className="ttile-check">
                      <div>
                        <label><span>Attestat-GPA</span> üzrə, nəticəni qeyd edin</label>
                        <GiCancel  style={{color:'red'}}/>
                      </div>
                      <Field name='attestat' type='text' placeholder='Nəticə'/>
                    </div>:null
                  }
                                    {
                    values.Lan===true?
                    <div className="ttile-check">
                    <div>
                      <label><span>Language test (IELTS TOEFL)</span> üzrə, nəticəni qeyd edin</label>
                      <GiCancel  style={{color:'red'}}/>
                    </div>
                    <Field name='ielts' type='text' placeholder='İELTS Nəticə'/>
                    <Field name='toffiel' type='text' placeholder='TOFFİEL Nəticə'/>
                  </div>:null
                  }
                  {
                    values.SAT===true?      <div className="ttile-check">
                    <div>
                      <label><span>SAT</span> üzrə, nəticəni qeyd edin</label>
                      <GiCancel style={{color:'red'}} onClick={()=> values.SAT=false}/>
                    </div>
                    <Field name='sat' type='text' placeholder='Nəticə'/>
                  </div>:null
                  }
              </div>
              </div>
              
              :null
            }
            <div className="sbmt">
            <button type="submit" className="submitForm">Yadd saxla <AiOutlineCheck/></button>
            </div>
          
          </Form>
        )}
      </Formik>
    </>
  )
        }

export default Bakalavr
