export interface Student {
    name: string,
    param: {
        fullname: string,
         class: string,
        email: string,
        phone: string
    }

}


export interface TestsApi {
  name: string,
  param: {
    student_id: string | null
   
  }
}
export interface School {
  name: string,
  param: {
    schoolname: string,
    fullname: string,
    // class: string,
    email: string,
    phone: string
  }

}
