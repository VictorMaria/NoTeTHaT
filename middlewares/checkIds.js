const checkIds = (req, res, next) => {
  const noteIds = req.body.id;
  const checkArray = Array.isArray(noteIds);
  if (checkArray === false && typeof noteIds !== 'string') {
    return res.status(400).json({ message: 'Atleast one id is required' });
  }
  if (typeof noteIds === 'string' && !noteIds.match(/^[0-9a-f]{24}$/)) {
    return res.status(400).json({ message: 'id is not valid' });
  }
  if (Array.isArray(noteIds) && (noteIds.filter((noteId) => !noteId.match(/^[0-9a-f]{24}$/)).length > 0)) {
    return res.status(400).json({ message: 'Ensure all ids are valid' });
  }
  return next();
};

export default checkIds;
