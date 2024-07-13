const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async addNote(note) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error(`Failed to add note: ${response.message}`);
      }
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      throw new Error(
        "Unable to connect. Please check your internet connection and try again.",
      );
    }
  }

  static async getNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.message}`);
      }
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      throw new Error(
        "Unable to connect. Please check your internet connection and try again.",
      );
    }
  }

  static async getArchivedNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      if (!response.ok) {
        throw new Error(`Failed to fetch archived notes: ${response.message}`);
      }
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      throw new Error(
        "Unable to connect. Please check your internet connection and try again.",
      );
    }
  }

  static async getNoteById(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch note: ${response.message}`);
      }
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      throw new Error(
        "Unable to connect. Please check your internet connection and try again.",
      );
    }
  }

  static async archiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`Failed to archive note: ${response.message}`);
      }
    } catch (error) {
      throw new Error(
        "Unable to connect. Please check your internet connection and try again.",
      );
    }
  }

  static async unarchiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`Failed to unarchive note: ${response.message}`);
      }
    } catch (error) {
      throw new Error(
        "Unable to connect. Please check your internet connection and try again.",
      );
    }
  }

  static async deleteNoteById(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.message}`);
      }
    } catch (error) {
      throw new Error(
        "Unable to connect. Please check your internet connection and try again.",
      );
    }
  }
}

export default NotesApi;
