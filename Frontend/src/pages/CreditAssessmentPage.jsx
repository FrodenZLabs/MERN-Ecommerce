import { useState } from "react";
import Stepper from "../components/Stepper";
import { steps } from "../constants/StepperSteps";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResidenceDetailsForm from "../components/ResidenceDetailsForm";
import EducationBackgroundForm from "../components/EducationBackgroundForm";
import GuarantorPersonalDetailsForm from "../components/GuarantorPersonalDetailsForm";
import GuarantorFinancialDetailsForm from "../components/GuarantorFinancialDetailsForm";
import GuarantorMoreDetailsForm from "../components/GuarantorMoreDetailsForm";
import ReviewSubmitForm from "../components/ReviewSubmitForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createClient, createGuarantor } from "../redux/services/authService";
import {
  setEducationData,
  setGuarantorData,
  setGuarantorFinancialData,
  setPersonalData,
  setResidenceData,
} from "../redux/reducers/formSlice";
import { useNavigate } from "react-router-dom";

const CreditAssessmentPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);
  const { currentUser } = useSelector((state) => state.authentication);
  const userId = currentUser._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    try {
      // Extract form data
      const { personalData, residenceData, educationData, guarantorData } =
        formData;

      // Construct client payload
      const clientPayload = {
        userId,
        full_name: personalData.fullName,
        id_number: personalData.idNumber,
        phone_no: personalData.phoneNumber,
        gender: personalData.gender,
        marital_status: personalData.maritalStatus,
        image: personalData.profileImage.name,
        id_image: personalData.idImage.name,
        date_of_birth: personalData.dob,
        institution_level: educationData.institutionLevel,
        institution_name: educationData.institutionName,
        course: educationData.course,
        adm_number: educationData.admNumber,
        school_type: educationData.schoolType,
        completion_year: educationData.examYearCompletion,
        nearest_primary_school: residenceData.nearestPrimarySchool,
        estate_village: residenceData.estateVillage,
        town_city: residenceData.townCity,
        constituency: residenceData.constituency,
        county: residenceData.county,
      };
      // Construct guarantor payload
      const guarantorPayload = {
        userId,
        full_name: guarantorData.guarantorName,
        phone_no: guarantorData.guarantorPhone,
        id_number: guarantorData.guarantorIdNumber,
        gender: guarantorData.guarantorGender,
        kra_pin: guarantorData.kraPin,
        date_of_birth: guarantorData.guarantorDOB,
        marital_status: guarantorData.guarantorMaritalStatus,
        no_of_dependants: guarantorData.guarantorDependants,
        education_level: guarantorData.guarantorEducationLevel,
        relationship_to_student: guarantorData.guarantorRelationship,
      };
      console.log(clientPayload);
      console.log(guarantorPayload);
      const clientResponse = await createClient(clientPayload);
      const guarantorResponse = await createGuarantor(guarantorPayload);

      toast.success(clientResponse.message);
      toast.success(guarantorResponse.message);
      navigate("/credit-prediction");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        <Stepper currentStep={currentStep} />

        {/* Form content based on currentStep */}
        <div className="">
          {currentStep === 0 && (
            <PersonalInfoForm
              personalData={formData.personalData}
              setPersonalData={(data) => dispatch(setPersonalData(data))}
            />
          )}
          {currentStep === 1 && (
            <ResidenceDetailsForm
              residenceData={formData.residenceData}
              setResidenceData={(data) => dispatch(setResidenceData(data))}
            />
          )}
          {currentStep === 2 && (
            <EducationBackgroundForm
              educationData={formData.educationData}
              setEducationData={(data) => dispatch(setEducationData(data))}
            />
          )}
          {currentStep === 3 && (
            <GuarantorPersonalDetailsForm
              guarantorData={formData.guarantorData}
              setGuarantorData={(data) => dispatch(setGuarantorData(data))}
            />
          )}
          {currentStep === 4 && (
            <GuarantorFinancialDetailsForm
              guarantorData={formData.guarantorData}
              setGuarantorData={(data) => dispatch(setGuarantorData(data))}
            />
          )}
          {currentStep === 5 && (
            <GuarantorMoreDetailsForm
              guarantorFinancialData={formData.guarantorFinancialData}
              setGuarantorFinancialData={(data) =>
                dispatch(setGuarantorFinancialData(data))
              }
            />
          )}
          {currentStep === 6 && (
            <ReviewSubmitForm
              personalData={formData.personalData}
              residenceData={formData.residenceData}
              educationData={formData.educationData}
              guarantorData={formData.guarantorData}
              guarantorFinancialData={formData.guarantorFinancialData}
              handleSubmit={handleSubmit}
              handleEdit={() => setCurrentStep(0)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between p-6">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            className="bg-gray-700 text-white px-8 py-2 rounded-lg disabled:opacity-0"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            disabled={currentStep === steps.length - 1}
            className="bg-blue-500 text-white px-8 py-2 rounded-lg disabled:opacity-0"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditAssessmentPage;
