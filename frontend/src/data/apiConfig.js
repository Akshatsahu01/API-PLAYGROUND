const apiConfig = {
  doctors: {
    endpoint: "/doctors",
    label:"Doctors",
    filters: [
      {
        id: "experience",
        label: "Experience",
        options: ["+1", "+3", "+5", "+10"],
      },
      {
        id: "availability",
        label: "Availablity",
        options: ["Available", "Unavailable"],
      },
      {
        id: "specialization",
        label: "Specialization",
        options: ["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic"],
      },
    ],
  },

    patients: {
    endpoint: "/patients",
    label:"Patients",
    filters: [
      {
        id: "gender",
        label: "Gender",
        options: ["Male", "Female", "Other"],
      },
      {
        id: "age",
        label: "Age",
        options: ["0-18", "19-30", "31-50", "50+"],
      },
      {
        id: "doctorAssigned",
        label: "Doctor Assigned",
        options: [
        {
          label:"Dr. Rahul",
          value:1
        },
        {
         label:"Dr. priya",
         value:2
        },
        {
          label:"Dr. Amit",
          value:3
        }
        ],
      },
      {
        id: "amountToBePaid",
        label: "Amount To Be Paid",
        options: [
          "< ₹1000",
          "₹1000 - ₹5000",
          "> ₹5000",
        ],
      },
      {
        id: "sickness",
        label: "Sickness",
        options: [
          "Diabetes",
          "Fever",
          "Cancer",
          "COVID-19",
        ],
      },
    ],
  },
};

export default apiConfig
