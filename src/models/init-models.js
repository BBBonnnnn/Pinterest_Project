import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _binh_luan from  "./binh_luan.js";
import _hinh_anh from  "./hinh_anh.js";
import _luu_anh from  "./luu_anh.js";
import _nguoi_dung from  "./nguoi_dung.js";
import _quen_mat_khau_code from  "./quen_mat_khau_code.js";

export default function initModels(sequelize) {
  const binh_luan = _binh_luan.init(sequelize, DataTypes);
  const hinh_anh = _hinh_anh.init(sequelize, DataTypes);
  const luu_anh = _luu_anh.init(sequelize, DataTypes);
  const nguoi_dung = _nguoi_dung.init(sequelize, DataTypes);
  const quen_mat_khau_code = _quen_mat_khau_code.init(sequelize, DataTypes);

  binh_luan.belongsTo(hinh_anh, { as: "hinh", foreignKey: "hinh_id"});
  hinh_anh.hasMany(binh_luan, { as: "binh_luans", foreignKey: "hinh_id"});
  luu_anh.belongsTo(hinh_anh, { as: "hinh", foreignKey: "hinh_id"});
  hinh_anh.hasMany(luu_anh, { as: "luu_anhs", foreignKey: "hinh_id"});
  binh_luan.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(binh_luan, { as: "binh_luans", foreignKey: "nguoi_dung_id"});
  hinh_anh.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(hinh_anh, { as: "hinh_anhs", foreignKey: "nguoi_dung_id"});
  luu_anh.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(luu_anh, { as: "luu_anhs", foreignKey: "nguoi_dung_id"});
  quen_mat_khau_code.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(quen_mat_khau_code, { as: "quen_mat_khau_codes", foreignKey: "nguoi_dung_id"});

  return {
    binh_luan,
    hinh_anh,
    luu_anh,
    nguoi_dung,
    quen_mat_khau_code,
  };
}
