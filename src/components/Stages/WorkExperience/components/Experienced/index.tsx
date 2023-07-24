import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { addData, addPage, delPage } from 'state/dataSlice';
import './style.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
interface RootState {
	dataa: {
	datas: []; 
	};
  }

const ExperienceValid = Yup.object().shape({
  company: Yup.string().required('Please provide New Password'),
  duty: Yup.string().required('Please provide New Password'),
  workStart: Yup.string().required('Please provide New Password'),
  options: Yup.boolean().required('Please provide New Password'),
});

function Experienced() {

const datas = useSelector((state: RootState) => state.dataa.datas);
  const dispatch: Dispatch = useDispatch();
  return (
    <div>
      <Formik
        initialValues={{
			id:datas.length+1 ,
			company: '',
			duty: '',
			workStart: '',
			labour:'',
			professionalism:'',
			workEnd: '',
			options: false,
		}}
        validationSchema={ExperienceValid}
        onSubmit={(values, { resetForm }) => {
            dispatch(delPage(1))
            const copy = {
				id:datas.length+1,
				company: values.company,
				duty: values.duty,
				labour: values.labour,
				professionalism: values.professionalism,
				workStart: values.workStart,
				workEnd: values.workEnd,
				options: values.options
			}
			dispatch(addData(copy))
            toast.success('tecrubeniz elave olundu', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            });
            resetForm({});
          }}
      >
        {({ values, errors, touched }) => (
          <Form className="form-worker">
            <div>
              <div className="company">
                <label>Çalışdığınız müəssisənin adını qeyd edin.*</label>
                <Field name="company" type="text" className="textInp" />
              </div>
              <div className="duty">
                <label>Vəzifənizi qeyd edin.*</label>
                <Field name="duty" type="text" className="textInp" />
              </div>

              <div className="start">
                <label>İşə başlama tarixi: </label>
                <Field type="month" name="workStart" />
              </div>
              <div className="end">
                <label>İşdən ayrılma tarixi: </label>
                <Field type="month" name="workEnd" />
              </div>

              <div className="options">
                <Field type="checkbox" name="options" />
                <label>Hal hazırda çalışıram.</label>
              </div>
              <div className="save">
                <button className="save-data" type="submit">
                  Yadda saxla <AiOutlineCheck className="icon" />
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Experienced;
