import axios from "axios";

const baseUrl = "https://camp-courses.api.kreosoft.space/";

let instance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("delivery-jwt-token")}`,
  },
});

export function refreshInstance() {
  instance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("delivery-jwt-token")}`,
    },
  });
}

function getCourseGroups() {
  return instance
    .get("groups")
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function createCourseGroup(name) {
  return instance
    .post("groups", {
      name: name,
    })
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        return response.status;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function editCourseGroup(name, id) {
  return instance
    .put(`groups/${id}`, {
      name: name,
    })
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        return response.status;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteCourseGroup(id) {
  return instance
    .delete(`groups/${id}`)
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        return response.status;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCourses(id) {
  return instance
    .get(`groups/${id}`)
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTeachers() {
  return instance.get("users").then((response) => {
    console.log(response); // TODO: delete later
    if (response.status === 200) {
      return response.data;
    }
  });
}

function createCourse(createCourse, idGroup, idTeacher) {
  return instance
    .post(`courses/${idGroup}`, {
      name: createCourse.name,
      startYear: createCourse.year,
      maximumStudentsCount: createCourse.totalNumberOfSeats,
      semester: createCourse.semester,
      requirements: createCourse.requirements,
      annotations: createCourse.annotations,
      mainTeacherId: idTeacher,
    })
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        return response.status;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getMyCourses() {
  return instance
    .get("courses/my")
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTeachingCourses() {
  return instance
    .get("courses/teaching")
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCourseDetails(id) {
  return instance
    .get(`courses/${id}/details`)
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        let _response = {
          course: {
            name: response.data.name,
            year: response.data.startYear,
            totalNumberOfSeats: response.data.maximumStudentsCount,
            studentsEnrolledCount: response.data.studentsEnrolledCount,
            studentsInQueueCount: response.data.studentsInQueueCount,
            semester: response.data.semester,
            requirements: response.data.requirements,
            annotations: response.data.annotations,
            status: response.data.status,
          },
          teachers: response.data.teachers,
          students: response.data.students,
          notifications: response.data.notifications,
        };
        return _response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function editCourse(editCourse, id) {
  return instance
    .put(`courses/${id}`, {
      requirements: editCourse.requirements,
      annotations: editCourse.annotations,
    })
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        let _response = {
          course: {
            name: response.data.name,
            year: response.data.startYear,
            totalNumberOfSeats: response.data.maximumStudentsCount,
            studentsEnrolledCount: response.data.studentsEnrolledCount,
            studentsInQueueCount: response.data.studentsInQueueCount,
            semester: response.data.semester,
            requirements: response.data.requirements,
            annotations: response.data.annotations,
            status: response.data.status,
          },
          teachers: response.data.teachers,
          students: response.data.students,
          notifications: response.data.notifications,
          status: response.status,
        };
        return _response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteCourse(id) {
  return instance.delete(`courses/${id}`).then((response) => {
    console.log(response); // TODO: delete later
    if (response.status === 200) {
      return response.status;
    }
  });
}

function enrollCourse(id) {
  return instance.post(`courses/${id}/sign-up`).then((response) => {
    console.log(response); // TODO: delete later
    if (response.status === 200) {
      return response.status;
    }
  });
}

function editCourseStatus(status, id) {
  return instance
    .post(`courses/${id}/status`, {
      status: status,
    })
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        let _response = {
          course: {
            name: response.data.name,
            year: response.data.startYear,
            totalNumberOfSeats: response.data.maximumStudentsCount,
            studentsEnrolledCount: response.data.studentsEnrolledCount,
            studentsInQueueCount: response.data.studentsInQueueCount,
            semester: response.data.semester,
            requirements: response.data.requirements,
            annotations: response.data.annotations,
            status: response.data.status,
          },
          teachers: response.data.teachers,
          students: response.data.students,
          notifications: response.data.notifications,
          status: response.status,
        };
        return _response;
      }
    });
}

function createNotificationInCourse(notification, id) {
  return instance
    .post(`courses/${id}/notifications`, {
      text: notification.text,
      isImportant: notification.isImportant,
    })
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        let _response = {
          course: {
            name: response.data.name,
            year: response.data.startYear,
            totalNumberOfSeats: response.data.maximumStudentsCount,
            studentsEnrolledCount: response.data.studentsEnrolledCount,
            studentsInQueueCount: response.data.studentsInQueueCount,
            semester: response.data.semester,
            requirements: response.data.requirements,
            annotations: response.data.annotations,
            status: response.data.status,
          },
          teachers: response.data.teachers,
          students: response.data.students,
          notifications: response.data.notifications,
          status: response.status,
        };
        return _response;
      }
    });
}

function addTeacherToCourse(idTeacher, idCourse) {
  return instance
    .post(`courses/${idCourse}/teachers`, {
      userId: idTeacher
    })
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        let _response = {
          course: {
            name: response.data.name,
            year: response.data.startYear,
            totalNumberOfSeats: response.data.maximumStudentsCount,
            studentsEnrolledCount: response.data.studentsEnrolledCount,
            studentsInQueueCount: response.data.studentsInQueueCount,
            semester: response.data.semester,
            requirements: response.data.requirements,
            annotations: response.data.annotations,
            status: response.data.status,
          },
          teachers: response.data.teachers,
          students: response.data.students,
          notifications: response.data.notifications,
          status: response.status,
        };
        return _response;
      }
    });
}

function editStudentMarkInCourse(student, idCourse) {
  return instance
    .post(`courses/${idCourse}/marks/${student.id}`, {
      markType: student.attestation,
      mark: student.status,
    })
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        let _response = {
          course: {
            name: response.data.name,
            year: response.data.startYear,
            totalNumberOfSeats: response.data.maximumStudentsCount,
            studentsEnrolledCount: response.data.studentsEnrolledCount,
            studentsInQueueCount: response.data.studentsInQueueCount,
            semester: response.data.semester,
            requirements: response.data.requirements,
            annotations: response.data.annotations,
            status: response.data.status,
          },
          teachers: response.data.teachers,
          students: response.data.students,
          notifications: response.data.notifications,
          status: response.status,
        };
        return _response;
      }
    });
}

export function editStudentStatusInCourse(status, idStudent, idCourse) {
  return instance
    .post(`courses/${idCourse}/student-status/${idStudent}`, {
      status: status,
    })
    .then((response) => {
      console.log(response); // TODO: delete later
      if (response.status === 200) {
        let _response = {
          course: {
            name: response.data.name,
            year: response.data.startYear,
            totalNumberOfSeats: response.data.maximumStudentsCount,
            studentsEnrolledCount: response.data.studentsEnrolledCount,
            studentsInQueueCount: response.data.studentsInQueueCount,
            semester: response.data.semester,
            requirements: response.data.requirements,
            annotations: response.data.annotations,
            status: response.data.status,
          },
          teachers: response.data.teachers,
          students: response.data.students,
          notifications: response.data.notifications,
          status: response.status,
        };
        return _response;
      }
    });
}

export const courseGroupApi = {
  getCourseGroups: getCourseGroups,
  createCourseGroup: createCourseGroup,
  editCourseGroup: editCourseGroup,
  deleteCourseGroup: deleteCourseGroup,
  getCourses: getCourses,
  getTeachers: getTeachers,
  createCourse: createCourse,
  getCourseDetails: getCourseDetails,
  getMyCourses: getMyCourses,
  getTeachingCourses: getTeachingCourses,
  editCourse: editCourse,
  deleteCourse: deleteCourse,
  enrollCourse: enrollCourse,
  editCourseStatus: editCourseStatus,
  createNotificationInCourse: createNotificationInCourse,
  addTeacherToCourse: addTeacherToCourse,
  editStudentMarkInCourse: editStudentMarkInCourse,
  editStudentStatusInCourse: editStudentStatusInCourse,
};
