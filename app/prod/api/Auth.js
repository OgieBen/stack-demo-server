import { Router } from 'express';
import { Factory } from '../Factory';
import { detect } from 'detect-browser';
import  crypto  from 'crypto';



// config();
let router = Router();


const factory = new Factory();
const auth = factory.getAuth();
let browser = detect();



/**
 *  This endpoint authenticates a user using th user's password and email 
 *  (Note: change method from get to post)
 *  PAYLOAD:
 * @method POST
 * @param String email
 * @param String password
 * 
 * @returns JSON
 */
router.post('/login', (req, res) => {

    let email = req.body.email.toString();
    let password = req.body.password.toString();

    auth.login(email, password, (flag, data) => {
        
        if (flag) {

            let encrypted = '';
            const footPrint = email + password + browser.name + browser.os + browser.version;
            const cipher = crypto.createCipher('aes192', footPrint);

            cipher.on('readable', () => {
                const data = cipher.read();
                if (data) {
                    encrypted += data.toString('hex');
                }
            });

            cipher.on('end', () => {
                console.log(encrypted);
                req.session.footprint = encrypted;
                req.cookie(email, encrypted);

            });

            if(data !== 0){
                console.log("Value" + data[0].id);

                res.json({
                    msg: "Login Succesful",
                    status: true,
                    userId: data[0].id
    
                });
                return;
                
            }
            
            res.json({
                msg: "Login Error: Could not get user",
                status: false,
            });

            return;
        }
        if (flag === 'undefined' || flag == false) {
            res.json({
                msg: "Login Error: please check credentials ",
                status: false,
            });
        }

    });

});

/**
 * This endpoint create a user account
 * 
 * @method POST
 * 
 * @param String email
 * @param String password
 * 
 * @return JSON 
 */
router.post('/signup', (req, res) => {

    // TODO validate and clean user date

    let name = req.body.name.toString();
    let email = req.body.email.toString();
    let password = req.body.password.toString();

    console.log(`parameters: ${name, email, password}`);

    auth
        .signUp(name, email, password, (flag) => {
            if (flag) {


                let encrypted = '';
                const footPrint = email + password + browser.name + browser.os + browser.version;
                const cipher = crypto.createCipher('aes192', footPrint);

                cipher.on('readable', () => {
                    const data = cipher.read();
                    if (data) {
                        encrypted += data.toString('hex');
                    }
                });

                cipher.on('end', () => {
                    console.log(encrypted);
                    req.session.footprint = encrypted;
                    req.cookie(email, encrypted);

                });

                res.json({
                    msg: "Sign Up Succesful",
                    status: true,
                });
                return;
            }

            res.json({
                msg: "Login Error: please check credentials ",
                status: false,
            });
        });

});

router.get('/dbsetup/:key', (req, res) => {

    // let key = req.params.key.toString();

    // if (key ===  "123"){

    // set up db
    let result = factory
        .getDbc()
        .setUpDb();

    if (result) {
        res.json({
            msg: true,
        });
    }

    res.json({
        msg: false,
    });


    // }
});




module.exports = router;
