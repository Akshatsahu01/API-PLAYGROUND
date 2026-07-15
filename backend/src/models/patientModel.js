import pool from "../config/db.js"

async function getAllPatients(filters){
    const conditions=[]
    const values=[]
    let query="SELECT * FROM patients"
    if(filters.gender){
        conditions.push(`gender=$${values.length+1}`);
        values.push(filters.gender)
    }
    if(filters.age){
        if(filters.age=="0-18"){
            conditions.push(`age BETWEEN $${values.length+1} AND $${values.length+2}`)
            values.push(0);
            values.push(18)
        }
        else if(filters.age=="19-30"){
            conditions.push(`age BETWEEN $${values.length+1} AND $${values.length+2}`)
            values.push(19);
            values.push(30)
        }
        else if(filters.age=="31-50"){
            conditions.push(`age BETWEEN $${values.length+1} AND $${values.length+2}`)
            values.push(31);
            values.push(50)
        }
        else {
            conditions.push(`age>=$${values.length+1}`)
            values.push(50)
        }
    }
        if(filters.doctorAssigned){
        conditions.push(`doctor_id=$${values.length+1}`);  //if later we change doctorAssigned to assigneddoctor we don't have to change the patient schema .Our schema will have doctor_id as foreign key 
        values.push(Number(filters.doctorAssigned))  //value is stored as string 
    }
    if (filters.amountToBePaid) {
  if (filters.amountToBePaid === "< ₹1000") {
    conditions.push(`amount_to_be_paid < $${values.length + 1}`);
    values.push(1000);
  }

  else if (filters.amountToBePaid === "₹1000 - ₹5000") {
    conditions.push(
      `amount_to_be_paid BETWEEN $${values.length + 1} AND $${values.length + 2}`
    );
    values.push(1000);
    values.push(5000);
  }

  else if (filters.amountToBePaid === "> ₹5000") {
    conditions.push(`amount_to_be_paid > $${values.length + 1}`);
    values.push(5000);
  }
}
    if(filters.sickness){
        conditions.push(`sickness=$${values.length+1}`);
        values.push(filters.sickness)
    }
   if(conditions.length>0){
       query+=` WHERE ${conditions.join(" AND ")}`
   }
  const result=await pool.query(query,values)
  return result.rows
}

export default {
    getAllPatients
}