exports.ok = (res, data = {}, message = 'OK') =>
  res.status(200).json({ ok: true, message, data });

exports.created = (res, data = {}, message = 'Creado') =>
  res.status(201).json({ ok: true, message, data });

exports.bad = (res, message = 'Bad Request', error = null) =>
  res.status(400).json({ ok: false, message, error });

exports.notFound = (res, message = 'No encontrado') =>
  res.status(404).json({ ok: false, message });

exports.fail = (res, message = 'Error del servidor', error = null) =>
  res.status(500).json({ ok: false, message, error });