const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async addNote(note) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }
    const responseJson = await response.json();
    return responseJson.data;
  }

  static async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }
    const responseJson = await response.json();
    return responseJson.data;
  }

  static async getArchivedNotes() {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }
    const responseJson = await response.json();
    return responseJson.data;
  }

  static async getNoteById(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }
    const responseJson = await response.json();
    return responseJson.data;
  }

  static async archiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
    });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }
  }

  static async unarchiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
    });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }
  }

  static async deleteNoteById(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Something went wrong`);
    }
  }
}

export default NotesApi;
