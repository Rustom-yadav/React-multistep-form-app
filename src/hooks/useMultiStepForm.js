import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "multiStepFormData";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",

  company: "",
  role: "",
  experience: "",
  skills: [],

  degree: "",
  university: "",
  graduationYear: "",
  gpa: "",

  
  newsletter: true,
  theme: "system",
  communication: "email",
  bio: "",
};

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...initialFormData, ...JSON.parse(saved) };
    }
  } catch {
    /* ignore parse errors */
  }
  return initialFormData;
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota errors */
  }
}

export function useMultiStepForm(totalSteps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(loadFromStorage);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    saveToStorage(formData);
  }, [formData]);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const updateFields = useCallback((fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(fields).forEach((key) => delete next[key]);
      return next;
    });
  }, []);

  const validateStep = useCallback(
    (step) => {
      const newErrors = {};

      if (step === 0) {
        if (!formData.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!formData.lastName.trim())
          newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Enter a valid email address";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^[\d\s\-+()]{7,20}$/.test(formData.phone)) {
          newErrors.phone = "Enter a valid phone number";
        }
      }

      if (step === 1) {
        if (!formData.company.trim())
          newErrors.company = "Company name is required";
        if (!formData.role.trim())
          newErrors.role = "Job role is required";
        if (!formData.experience)
          newErrors.experience = "Experience is required";
        if (formData.skills.length === 0)
          newErrors.skills = "Select at least one skill";
      }

      if (step === 2) {
        if (!formData.degree.trim())
          newErrors.degree = "Degree is required";
        if (!formData.university.trim())
          newErrors.university = "University is required";
        if (!formData.graduationYear)
          newErrors.graduationYear = "Graduation year is required";
      }

      if (step === 3) {
        if (!formData.bio.trim()) {
          newErrors.bio = "A short bio is required";
        } else if (formData.bio.trim().length < 20) {
          newErrors.bio = "Bio must be at least 20 characters";
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  const nextStep = useCallback(() => {
    if (validateStep(currentStep) && currentStep < totalSteps - 1) {
      setDirection("next");
      setCurrentStep((prev) => prev + 1);
      return true;
    }
    return false;
  }, [currentStep, totalSteps, validateStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setDirection("prev");
      setCurrentStep((prev) => prev - 1);
      setErrors({});
      return true;
    }
    return false;
  }, [currentStep]);

  const goToStep = useCallback(
    (step) => {
      if (step >= 0 && step < totalSteps && step < currentStep) {
        setDirection(step < currentStep ? "prev" : "next");
        setCurrentStep(step);
        setErrors({});
      }
    },
    [currentStep, totalSteps]
  );

  const submitForm = useCallback(() => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
      return true;
    }
    return false;
  }, [currentStep, validateStep]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setErrors({});
    setIsSubmitted(false);
    setDirection("next");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    currentStep,
    formData,
    errors,
    isSubmitted,
    direction,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    progress: ((currentStep + 1) / totalSteps) * 100,
    updateField,
    updateFields,
    validateStep,
    nextStep,
    prevStep,
    goToStep,
    submitForm,
    resetForm,
  };
}
