const Account = require('../../models/account.model');
const Role = require('../../models/role.model');

module.exports.authRequire = async (req, res, next) => {
  if (!req.session.accountId) {
    return res.redirect('/admin/account/login');
  }
  next();
}

module.exports.isLogin = async (req, res, next) => {
  const account_id = req.session.accountId;

  const account = await Account.findOne({_id: account_id, deleted: false});
  
  if(account) {
    res.locals.account = account;
    const role = await Role.findOne({_id: account.role_id});
    res.locals.role = role;
  }

  next();
}