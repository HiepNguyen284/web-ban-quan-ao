const Role = require('../models/role.model');

module.exports.getTenChucVu = async (account) => {
  const role = await Role.findOne({_id: account.role_id});

  return role.name;
}