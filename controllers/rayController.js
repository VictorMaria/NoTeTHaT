import Ray from '../models/Ray';

class NoteController {
  static async caputeRayFromPC(user, details) {
    try {
        await Ray.updateOne(
          {
            userId: user,
            body: details.clipboardContent,
          },
          {
            userId: user,
            body: details.clipboardContent,
            from: 'PC',
            to: 'Phone',
          },
          { upsert: true });
        return 'success';
    } catch (err) {
      return 'Oops, a hiccup!';
    }
  }
}

export default NoteController;
