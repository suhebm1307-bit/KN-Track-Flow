'use strict';

/** Require any authenticated user */
function requireAuth(req, res, next) {
  if (!req.session?.user) {
    return res.status(401).json({ error: 'Unauthorised — please log in' });
  }
  req.user = req.session.user;
  next();
}

/** Require admin role */
function requireAdmin(req, res, next) {
  if (!req.session?.user) {
    return res.status(401).json({ error: 'Unauthorised — please log in' });
  }
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  req.user = req.session.user;
  next();
}

module.exports = { requireAuth, requireAdmin };
