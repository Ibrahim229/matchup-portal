"use strict";(self.webpackChunkacacia_p3=self.webpackChunkacacia_p3||[]).push([[885],{1885:(ut,A,s)=>{s.r(A),s.d(A,{AccountModule:()=>gt});var c=s(6895),m=s(9299),U=s(5156),M=s(7802),t=s(4650),v=s(629),S=s(863),u=s(8952),g=s(3081);function Z(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"span",10),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.changeLang("ar"))}),t._uU(1,"AR"),t.qZA()}}function L(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"span",10),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.changeLang("en"))}),t._uU(1,"EN"),t.qZA()}}let R=(()=>{class n{constructor(e,o){this.translationService=e,this.loaderService=o,this.currentLang=""}ngOnInit(){this.getLang()}changeLang(e){this.translationService.setLanguage(e)}getLang(){this.translationService.currentLanguage$.subscribe(e=>{this.currentLang=e})}get Lang(){return M.U}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(v.D),t.Y36(S.D))},n.\u0275cmp=t.Xpm({type:n,selectors:[["account-layout"]],decls:15,vars:5,consts:[["RtlDir","",1,"account"],[1,"switch-lang"],[3,"click",4,"ngIf"],[1,"container"],[1,"row"],[1,"offset-md-1","col-md-5","col-12"],[1,"account__info"],["src","assets/images/logo/logo.svg","alt","acacia logo"],[1,"col-md-5","col-12"],[1,"account__form"],[3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1),t.YNc(2,Z,2,0,"span",2),t.YNc(3,L,2,0,"span",2),t.qZA(),t.TgZ(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6)(8,"h2"),t._uU(9),t.ALo(10,"translate"),t.qZA(),t._UZ(11,"img",7),t.qZA()(),t.TgZ(12,"div",8)(13,"div",9),t._UZ(14,"router-outlet"),t.qZA()()()()()),2&e&&(t.xp6(2),t.Q6J("ngIf",o.currentLang===o.Lang.english),t.xp6(1),t.Q6J("ngIf",o.currentLang===o.Lang.arabic),t.xp6(6),t.hij(" ",t.lcZ(10,3,"LABELS.WELCOME_TO")," "))},dependencies:[c.O5,m.lC,u.C,g.X$],styles:[".account[_ngcontent-%COMP%]{width:100%;height:100%;padding-top:9%;background-color:#f9f9f9;overflow:auto}.account[_ngcontent-%COMP%]   .switch-lang[_ngcontent-%COMP%]{position:absolute;top:0;right:0;padding:5px;margin:15px}.account[_ngcontent-%COMP%]   .switch-lang[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background:linear-gradient(90deg,#47858b 4.61%,#4e55a2 100.04%);color:#fff;padding:15px;width:25px;height:25px;border-radius:50%;outline:3px solid #8c8d98;cursor:pointer;display:flex;justify-content:center;align-items:center}.account__info[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;height:100%}.account__info[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:250px;margin-top:-30px}.account__form[_ngcontent-%COMP%]{background:#fff;box-shadow:0 1px 2px #00000014;border-radius:12px;padding:24px;max-width:420px}@media screen and (max-width: 768px){.account[_ngcontent-%COMP%]{display:flex;align-items:center}.account__form[_ngcontent-%COMP%]{margin-top:20px}}.account.rtl[_ngcontent-%COMP%]{direction:rtl;font-family:Cairo,sans-serif!important}.account.rtl[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{font-family:Cairo,sans-serif!important}.account.rtl[_ngcontent-%COMP%]   .switch-lang[_ngcontent-%COMP%]{right:unset;left:0}"]}),n})();var a=s(4006),p=s(8314),N=s(8522),d=s(3848),P=s(8112);let f=(()=>{class n{constructor(e){this.xhrService=e}getAdminUsers(){return this.xhrService.call({url:"admin/getAdminUsers",method:d.n.get,body:{}})}generateUser(e){return this.xhrService.call({url:`admin/generateUser/${e}`,method:d.n.get,body:{}})}deleteUser(e){return this.xhrService.call({url:`admin/deleteUser/${e}`,method:d.n.delete,body:{}})}changePassword(e){return this.xhrService.call({url:"admin/changePass",method:d.n.put,body:e})}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(P.d))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var w=s(6892),_=s(598);function y(n,r){1&n&&(t.TgZ(0,"div",13),t._UZ(1,"i",14),t.TgZ(2,"p",15),t._uU(3),t.ALo(4,"translate"),t.qZA()()),2&n&&(t.xp6(3),t.hij(" ",t.lcZ(4,1,"LABELS.FORM.VALIDATIONS.MIS_MATCH")," "))}let T=(()=>{class n{constructor(e,o,i,l){this.fb=e,this.location=o,this.accountService=i,this.toastrService=l,this.currentUser=JSON.parse(localStorage.getItem("currentUser")),this.forgotForm=this.fb.group({userName:[this.currentUser?.userName,[a.kI.required]],currentPassword:["",[a.kI.required]],newPassword:["",[a.kI.required]],confirmNewPassword:["",[a.kI.required]]},{validator:this.passwordMatchValidator})}onChangePassword(e){this.accountService.changePassword({currentPass:e.value.currentPassword,newPass:e.value.newPassword}).subscribe(i=>{this.toastrService.showToastr(i,N.V.success)})}formControl(e){return this.forgotForm?.get(e)}get forgotFormError(){if(this.forgotForm?.errors)return this.forgotForm.errors.notmatched}get InputTypes(){return p.o}handleCancel(){this.location.back()}passwordMatchValidator(e){return e.get("newPassword").value===e.get("confirmNewPassword").value?null:{passwordMismatch:!0}}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(a.qu),t.Y36(c.Ye),t.Y36(f),t.Y36(w._))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-forgot-password"]],decls:26,vars:25,consts:[["RtlDir","",1,"add-edit-page"],[1,"content-container"],["autocomplete","off",3,"formGroup","ngSubmit"],[1,"tab-container"],[1,"tab-headline"],[1,"form-row"],[1,"form-control-wrapper"],[3,"label","type","FormControl","isReadonly"],[3,"label","type","FormControl"],["class","error-message",4,"ngIf"],[1,"add-edit-actions","mt-2"],["type","button",1,"ac-btn","btn-outlined",3,"click"],["type","submit",1,"ac-btn","btn-outlined",3,"disabled"],[1,"error-message"],[1,"mat-error","fa-solid","fa-xmark"],[1,"mat-error"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"form",2),t.NdJ("ngSubmit",function(){return o.onChangePassword(o.forgotForm)}),t.TgZ(3,"div",3)(4,"h4",4),t._uU(5),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"div",5)(8,"div",6),t._UZ(9,"form-input",7),t.qZA(),t.TgZ(10,"div",6),t._UZ(11,"form-input",8),t.qZA()(),t.TgZ(12,"div",5)(13,"div",6),t._UZ(14,"form-input",8),t.qZA(),t.TgZ(15,"div",6),t._UZ(16,"form-input",8),t.YNc(17,y,5,3,"div",9),t.qZA()()(),t.TgZ(18,"div",10)(19,"div")(20,"button",11),t.NdJ("click",function(){return o.handleCancel()}),t._uU(21),t.ALo(22,"translate"),t.qZA(),t.TgZ(23,"button",12),t._uU(24),t.ALo(25,"translate"),t.qZA()()()()()()),2&e&&(t.xp6(2),t.Q6J("formGroup",o.forgotForm),t.xp6(3),t.hij(" ",t.lcZ(6,19,"ACTIONS.CHANGE_PASSWORD")," "),t.xp6(4),t.Q6J("label","LABELS.FORM.USER_NAME")("type",o.InputTypes.TEXT)("FormControl",o.formControl("userName"))("isReadonly",!0),t.xp6(2),t.Q6J("label","LABELS.FORM.CURRENT_PASSWORD")("type",o.InputTypes.PASSWORD)("FormControl",o.formControl("currentPassword")),t.xp6(3),t.Q6J("label","LABELS.FORM.NEW_PASSWORD")("type",o.InputTypes.PASSWORD)("FormControl",o.formControl("newPassword")),t.xp6(2),t.Q6J("label","LABELS.FORM.CONFIRM_NEW_PASSWORD")("type",o.InputTypes.PASSWORD)("FormControl",o.formControl("confirmNewPassword")),t.xp6(1),t.Q6J("ngIf",o.formControl("confirmNewPassword").touched&&(null==o.forgotForm.errors?null:o.forgotForm.errors.passwordMismatch)),t.xp6(4),t.hij(" ",t.lcZ(22,21,"ACTIONS.CANCEL")," "),t.xp6(2),t.Q6J("disabled",o.forgotForm.invalid),t.xp6(1),t.hij(" ",t.lcZ(25,23,"ACTIONS.SAVE")," "))},dependencies:[c.O5,u.C,a._Y,a.JL,a.sg,_.s,g.X$],styles:[".tab-container[_ngcontent-%COMP%]{background:#fff;padding:20px;border-radius:5px}.tab-container[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:12px;align-items:center}.tab-container[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%]   .form-control-wrapper[_ngcontent-%COMP%]{width:50%}.tab-container[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{font-weight:700;margin-bottom:17px}.tab-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]{margin:-7px 0 15px}"]}),n})();var b=s(8568),I=s(8776),E=s(4286);let F=(()=>{class n{constructor(e,o,i){this.fb=e,this.authLogicService=o,this.navigationService=i,this.loginForm=this.fb.group({userName:["",a.kI.required],password:["",a.kI.required]})}ngOnInit(){}formControl(e){return this.loginForm?.get(e)}onLogin(e){this.authLogicService.login(e.value).subscribe(o=>{this.navigationService.navigate(o.userData.role===b.G.Super_Admin?["/account"]:["/pitches"])})}get InputTypes(){return p.o}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(a.qu),t.Y36(I.a),t.Y36(E.f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],decls:14,vars:14,consts:[[1,"login__form"],["autocomplete","off",3,"formGroup","ngSubmit"],[1,"row"],[1,"form-control-wrapper"],[3,"label","type","FormControl"],[1,"btn-wrapper"],[1,"ac-btn","btn-fill",3,"disabled"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"h2"),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"form",1),t.NdJ("ngSubmit",function(){return o.onLogin(o.loginForm)}),t.TgZ(5,"div",2)(6,"div",3),t._UZ(7,"form-input",4),t.qZA(),t.TgZ(8,"div",3),t._UZ(9,"form-input",4),t.qZA(),t.TgZ(10,"div",5)(11,"button",6),t._uU(12),t.ALo(13,"translate"),t.qZA()()()()()),2&e&&(t.xp6(2),t.Oqu(t.lcZ(3,10,"ACCOUNT.SIGN_IN")),t.xp6(2),t.Q6J("formGroup",o.loginForm),t.xp6(3),t.Q6J("label","LABELS.FORM.USER_NAME")("type",o.InputTypes.TEXT)("FormControl",o.formControl("userName")),t.xp6(2),t.Q6J("label","LABELS.FORM.PASSWORD")("type",o.InputTypes.PASSWORD)("FormControl",o.formControl("password")),t.xp6(2),t.Q6J("disabled",o.loginForm.invalid),t.xp6(1),t.hij(" ",t.lcZ(13,12,"ACTIONS.SUBMIT")," "))},dependencies:[a._Y,a.JL,a.sg,_.s,g.X$],styles:[".login__form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:20px}.login__form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:10px 0}.login__form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#202020;font-weight:400}.login__form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#4e57a1;font-weight:700}.login__form[_ngcontent-%COMP%]   .forgot-wrapper[_ngcontent-%COMP%]{margin-bottom:11px}.login__form[_ngcontent-%COMP%]   .forgot-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#4e57a1}"]}),n})();var O=s(9646),J=s(2026),D=s(9195),Y=s(7453),h=s(5412);function Q(n,r){1&n&&(t.TgZ(0,"h1",9),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"ACCOUNT.REGISTER_USER")))}function q(n,r){if(1&n&&(t.TgZ(0,"div",10),t._UZ(1,"form-input",11),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("label","LABELS.FORM.USER_NAME")("type",e.InputTypes.TEXT)("FormControl",e.userName)}}function W(n,r){if(1&n&&(t.TgZ(0,"div",12)(1,"div")(2,"h6"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"h6"),t._uU(6),t.ALo(7,"translate"),t.qZA(),t.TgZ(8,"bdi")(9,"p"),t._uU(10),t.ALo(11,"translate"),t._UZ(12,"br"),t._uU(13),t.ALo(14,"translate"),t.qZA()()()()),2&n){const e=t.oxw();t.xp6(3),t.hij(" ",t.lcZ(4,6,"ACCOUNT.NEW_USER_REGISTERED")," "),t.xp6(3),t.hij(" ",t.lcZ(7,8,"ACCOUNT.SAVE_USER_CREDENTIALS")," "),t.xp6(4),t.AsE(" ",t.lcZ(11,10,"LABELS.FORM.USER_NAME"),": ",e.registeredUserDetails.username," "),t.xp6(3),t.AsE(" ",t.lcZ(14,12,"LABELS.FORM.PASSWORD"),": ",e.registeredUserDetails.password," ")}}function j(n,r){1&n&&(t.TgZ(0,"div",15)(1,"span",16),t._uU(2,"Loading..."),t.qZA()())}function B(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"button",13),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.onRegisterUser())}),t._uU(1),t.ALo(2,"translate"),t.YNc(3,j,3,0,"div",14),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("disabled",e.isNewUserSubmitting||e.userName.invalid),t.xp6(1),t.hij(" ",t.lcZ(2,3,"ACTIONS.CONFIRM")," "),t.xp6(2),t.Q6J("ngIf",e.isNewUserSubmitting)}}function G(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"button",17),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.onDismiss())}),t._uU(1),t.ALo(2,"translate"),t.qZA()}2&n&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"ACTIONS.CANCEL")," "))}function $(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"button",18),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.onDismiss())}),t._uU(1),t.ALo(2,"translate"),t.qZA()}2&n&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"ACTIONS.OK")," "))}let k=(()=>{class n{constructor(e,o){this.dialogRef=e,this.accountService=o,this.InputTypes=p.o,this.userName=new a.NI("",a.kI.required),this.isNewUserRegistered=!1,this.isNewUserSubmitting=!1}onRegisterUser(){this.isNewUserSubmitting=!0,this.accountService.generateUser(this.userName.value).subscribe(e=>{e.username?(this.registeredUserDetails=e,this.isNewUserRegistered=!0):this.isNewUserRegistered=!1,this.isNewUserSubmitting=!1})}onDismiss(){this.dialogRef.close(!0)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(h.so),t.Y36(f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["register-user-modal"]],decls:10,vars:6,consts:[["RtlDir","",1,"register-user"],[1,"register-user__form"],["mat-dialog-title","",4,"ngIf"],["class","form-control-wrapper",4,"ngIf"],["class","register-user__form__result",4,"ngIf"],[1,"register-user__form__actions"],["class","btn-fill",3,"disabled","click",4,"ngIf"],["class","btn-outlined",3,"click",4,"ngIf"],["class","btn-fill",3,"click",4,"ngIf"],["mat-dialog-title",""],[1,"form-control-wrapper"],[3,"label","type","FormControl"],[1,"register-user__form__result"],[1,"btn-fill",3,"disabled","click"],["class","mx-2 spinner-border text-success","role","status",4,"ngIf"],["role","status",1,"mx-2","spinner-border","text-success"],[1,"visually-hidden"],[1,"btn-outlined",3,"click"],[1,"btn-fill",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div"),t.YNc(3,Q,3,3,"h1",2),t.YNc(4,q,2,3,"div",3),t.YNc(5,W,15,14,"div",4),t.TgZ(6,"div",5),t.YNc(7,B,4,5,"button",6),t.YNc(8,G,3,3,"button",7),t.YNc(9,$,3,3,"button",8),t.qZA()()()()),2&e&&(t.xp6(3),t.Q6J("ngIf",!o.isNewUserRegistered),t.xp6(1),t.Q6J("ngIf",!o.isNewUserRegistered),t.xp6(1),t.Q6J("ngIf",o.isNewUserRegistered),t.xp6(2),t.Q6J("ngIf",!o.isNewUserRegistered),t.xp6(1),t.Q6J("ngIf",!o.isNewUserRegistered),t.xp6(1),t.Q6J("ngIf",o.isNewUserRegistered))},dependencies:[c.O5,h.uh,u.C,_.s,g.X$],styles:[".register-user__form[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:20px;margin-bottom:25px}.register-user__form__result[_ngcontent-%COMP%]{text-align:center}.register-user__form__result[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{margin-bottom:10px;font-weight:700}.register-user__form__result[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]:first-of-type{color:#079247}.register-user__form__result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{background-color:#eee;padding:20px 0;border-radius:5px;outline:1px dashed #079247;font-size:17px;margin:15px 0}.register-user__form__actions[_ngcontent-%COMP%]{display:flex;gap:10px}.register-user.rtl[_ngcontent-%COMP%]   .register-user__form[_ngcontent-%COMP%]{font-family:Cairo,sans-serif!important}.register-user.rtl[_ngcontent-%COMP%]   .register-user__form[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-family:Cairo,sans-serif!important;text-align:end}.register-user.rtl[_ngcontent-%COMP%]   .register-user__form__actions[_ngcontent-%COMP%]{flex-direction:row-reverse}"]}),n})();var H=s(4859),C=s(8255),X=s(7633);function K(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"button",7),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.handleRegisterUser())}),t._uU(1),t.ALo(2,"translate"),t.qZA()}2&n&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"ACTIONS.ADD_NEW_USER")," "))}function V(n,r){1&n&&(t.TgZ(0,"th"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"ACTIONS.ACTIONS")))}function z(n,r){if(1&n&&(t.TgZ(0,"tr")(1,"th"),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"th"),t._uU(5),t.ALo(6,"translate"),t.qZA(),t.YNc(7,V,3,3,"th",12),t.qZA()),2&n){const e=t.oxw(2);t.xp6(2),t.Oqu(t.lcZ(3,3,"LABELS.FORM.USER_NAME")),t.xp6(3),t.Oqu(t.lcZ(6,5,"LABELS.FORM.Role")),t.xp6(2),t.Q6J("ngIf",e.isHasRole(e.RoleType.Super_Admin))}}function tt(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"td",14)(1,"button",15),t._UZ(2,"i",16),t.qZA(),t.TgZ(3,"mat-menu",14,17)(5,"button",18),t.NdJ("click",function(){t.CHM(e);const i=t.oxw().$implicit,l=t.oxw(2);return t.KtG(l.handleRemoveUser(null==i?null:i._id))}),t._uU(6),t.ALo(7,"translate"),t.qZA()()()}if(2&n){const e=t.MAs(4);t.xp6(1),t.Q6J("matMenuTriggerFor",e),t.xp6(5),t.Oqu(t.lcZ(7,2,"ACTIONS.DELETE"))}}function et(n,r){if(1&n&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.YNc(5,tt,8,4,"td",13),t.qZA()),2&n){const e=r.$implicit,o=t.oxw(2);t.xp6(2),t.hij(" ",null==e?null:e.fullName," "),t.xp6(2),t.hij(" ",null!=e&&e.role?null==e?null:e.role:"-"," "),t.xp6(1),t.Q6J("ngIf",o.isHasRole(o.RoleType.Super_Admin))}}function nt(n,r){}function ot(n,r){if(1&n&&(t.TgZ(0,"data-table",8),t.ALo(1,"async"),t.YNc(2,z,8,7,"ng-template",null,9,t.W1O),t.YNc(4,et,6,3,"ng-template",null,10,t.W1O),t.YNc(6,nt,0,0,"ng-template",null,11,t.W1O),t.qZA()),2&n){const e=t.oxw();t.Q6J("pagination",!1)("dataSource",t.lcZ(1,2,e.usersTable$))}}const st=[{path:"",component:R,children:[{path:"",pathMatch:"full",redirectTo:"/login",title:"MatchUp"},{path:"login",component:F},{path:"forgot-password",component:T}]},{path:"account",component:U.r,children:[{title:"Users",path:"",component:(()=>{class n{constructor(e,o,i){this.accountService=e,this.dialog=o,this.translationService=i,this.usersTable$=(0,O.of)({data:[],pageIndex:0,length:0,emptyState:"No Data Found!"}),this.subs=new D.t,this.InputTypes=p.o,this.RoleType=b.G}ngOnInit(){this.subs.add=this.translationService.currentLanguage$.subscribe(()=>{this.getAdminUsers()})}getAdminUsers(){this.subs.add=this.accountService.getAdminUsers().subscribe(e=>{this.usersTable$=(0,O.of)({data:e,pageIndex:1,length:e.length,emptyState:"LABELS.NO_DATA"})})}handleRemoveUser(e){return this.dialog.open(J.$,{maxWidth:"550px",minWidth:"500px",data:{title:"ACTIONS.DELETE_USER",message:"LABELS.FORM.ARE_YOU_SURE",actionLabel:"ACTIONS.DELETE"}}).afterClosed().subscribe(l=>{if(!l)return l;this.subs.add=this.accountService.deleteUser(e).subscribe(()=>{this.getAdminUsers()})})}handleRegisterUser(){return this.dialog.open(k,{maxWidth:"550px",minWidth:"500px",disableClose:!0}).afterClosed()}isHasRole(e){return(0,Y.a)(e)}ngOnDestroy(){this.subs.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(f),t.Y36(h.uw),t.Y36(v.D))},n.\u0275cmp=t.Xpm({type:n,selectors:[["users-listing"]],decls:10,vars:5,consts:[[1,"page-container","contracts-listing"],[1,"page-header"],[1,"btn-wrapper"],["class","ac-btn btn-fill",3,"click",4,"ngIf"],[1,"page-content"],[1,"table-wrapper"],["class","preview__table",3,"pagination","dataSource",4,"ngIf"],[1,"ac-btn","btn-fill",3,"click"],[1,"preview__table",3,"pagination","dataSource"],["tableHead",""],["tableRows",""],["loaderRef",""],[4,"ngIf"],["RtlDir","",4,"ngIf"],["RtlDir",""],["mat-button","",3,"matMenuTriggerFor"],[1,"fa-solid","fa-ellipsis"],["menu","matMenu"],["mat-menu-item","","RtlDir","",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h4"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"div",2),t.YNc(6,K,3,3,"button",3),t.qZA()(),t.TgZ(7,"div",4)(8,"section",5),t.YNc(9,ot,8,4,"data-table",6),t.qZA()()()),2&e&&(t.xp6(3),t.hij(" ",t.lcZ(4,3,"ACCOUNT.ACCOUNT_MANAGEMENT")," "),t.xp6(3),t.Q6J("ngIf",o.isHasRole(o.RoleType.Super_Admin)),t.xp6(3),t.Q6J("ngIf",o.usersTable$))},dependencies:[c.O5,H.lW,C.VK,C.OP,C.p6,u.C,X.Q,c.Ov,g.X$]}),n})()},{title:"Change Password",path:"change-password",component:T}]}];let it=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[m.Bz.forChild(st),m.Bz]}),n})();var at=s(2271),ct=s(631),x=s(1599),lt=s(1166);let gt=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[c.ez,it,at.m,ct.q,x._8.forRoot({provide:x._A,useFactory:lt.x})]}),n})()}}]);