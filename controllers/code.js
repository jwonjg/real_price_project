var Code = require('../model/schemas/Code');
var Constant = require('../app/common/Constant');

const adminEmail = "admin@admin.admin";

const openStateCdGrpId = "CD001";

/**
 * Get /ensureAdminAccountGet
 */
exports.ensureAdminAccountGet = function(req, res, next) {
  if(req.user.email == adminEmail) {
    next();
  } else {
    res.status(401).send({ msg: 'AdminUnauthorized' });
  }
}

/**
 * Get /initCodeSchemaGet
 */
exports.initCodeSchemaGet = function(req, res) {
  let opentStateCode = Constant.codeInfo.openState;
  let initCodeList = [
    new Code({
      codeId: opentStateCode.codeIdList.closed,
      codeGrpId: opentStateCode.codeGrpId,
      codeNm: "closed",
      codeDesc: "상영종료",
      displayOrder: 1
    }),
    new Code({
      codeId: opentStateCode.codeIdList.opening,
      codeGrpId: opentStateCode.codeGrpId,
      codeNm: "opening",
      codeDesc: "상영중",
      displayOrder: 2
    }),
    new Code({
      codeId: opentStateCode.codeIdList.scheduled,
      codeGrpId: opentStateCode.codeGrpId,
      codeNm: "scheduled",
      codeDesc: "상영예정",
      displayOrder: 3
    })
  ];

  initCodeList.forEach((codeInfo) => {
    codeInfo.save(function(err) {
      console.log("saved!");
    });
  });
}
