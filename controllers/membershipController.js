const db = require("../db/queries");
require("dotenv").config();

module.exports.viewMembership = async function (req, res, next) {
  //   const userInfo = req.user;
  //   userInfo.then((user) => {
  //     console.log(user);
  //   });
  res.render("membership");
};

module.exports.updateMembership = async function (req, res, next) {
  const user = await req.user;
  const inputCode = req.body.membershipCode;
  const adminCode = process.env.ADMIN_SECRET;
  const memberCode = process.env.MEMBER_SECRET;
  if (user.type == "Admin") {
    res.render("membership", {
      message: "You already have the highest role possible!",
    });
  } else if (user.type == "Member" && inputCode == memberCode) {
    res.render("membership", {
      message: "You are already a member and entered a member code!",
    });
  } else if (inputCode == adminCode) {
    await db.updateMember(user.id, "Admin");
    res.redirect("/view-membership");
  } else if (inputCode == memberCode) {
    await db.updateMember(user.id, "Member");
    res.redirect("/view-membership");
  } else if (inputCode != adminCode || inputCode != memberCode) {
    res.render("membership", {
      message: "You have entered an invalid code!",
    });
  } else {
    res.redirect("/view-membership");
  }
  console.log(inputCode);
  console.log(user);
};
