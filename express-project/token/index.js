// 引入jwt token工具
const JwtUtil = require('./jwt');
// 我这里的是aes加密密码的可以去掉
const AesUtil = require('./aes');
// 登录
router.post('/login',(req,res) => {
    var userName = req.body.user;
    var pass = req.body.pass;
    new Promise((resolve, reject) => {
        // 根据用户名查询用户
        users.findOne({'username':userName}).exec((err,result) => {
           if(err){
               reject(err);
           }else{
               resolve(result);
           }
        });
    }).then((result) => {
        console.log(result);
        if(result){
            // 密码解密 利用aes
            var aes = new AesUtil(result.password);
            var password = aes.deCryto();
            if(pass == password){
                // 登陆成功，添加token验证
                let _id = result._id.toString();
                // 将用户id传入并生成token
                let jwt = new JwtUtil(_id);
                let token = jwt.generateToken();
                // 将 token 返回给客户端
                res.send({status:200,msg:'登陆成功',token:token});
            }else{
                res.send({status:400,msg:'账号密码错误'});
            }
        }else{
            res.send({status:404,msg:'账号不存在'})
        }
    }).catch((err) => {
        console.log(err);
        res.send({status:500,msg:'账号密码错误'});
    })
});

app.use(function (req, res, next) {
    // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
    if (req.url != '/user/login' && req.url != '/user/register') {
        let token = req.headers.token;
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            console.log(result);
            res.send({status: 403, msg: '登录已过期,请重新登录'});
            // res.render('login.html');
        } else {
            next();
        }
    } else {
        next();
    }
});