import pool from "../config/db";
async function getAllDOctors(){
    const result=await pool.query("SELECT * FROM doctors")
    return result.rows

}

export default {
    getAllDOctors
}