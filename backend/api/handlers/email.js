import 'dotenv/config.js';
import sgMail from '@sendgrid/mail';
import pool from '../config/pool.js'
import knex from '../config/dbKnex.js'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function operatorRegistrationEmail(recipientEmail,recipientName, recipientLastname, username, cellphone, password){
        
    let htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <body style="text-align:center">
            <h1>Dobrodošli na operateri.com!</h1>
            <a href="https://operateri.com">
            <img src="http://cdn.mcauto-images-production.sendgrid.net/321854280de58ba3/98f9cee8-752e-497c-b0db-852ddc86f764/260x40.png" alt="HTML tutorial" style="width:30%;height:auto;border:0">
            </a>
            <p>Uspesno ste se registrovali!</p>
            <h1>Vaši podaci:</h1>
            <p>Email: ${recipientEmail}</p>
            <p>Ime: ${recipientName}</p>
            <p>Prezime: ${recipientLastname}</p>
            <p>Username: ${username}</p>
            <p>Mobilni telefon: ${cellphone}</p>
            <p>Password: ${password}</p>
            </body>
            </html>
    `;
    let emails=await pool.query(knex('regruter').select('email').toString()+';')
    
    for(let i=0;i<emails.rowCount;i++){
        sgMail.send({
            to: emails.rows[i].email, 
            from: process.env.EMAIL,
            subject: "Stigao je novi zahtev",
            html: htmlTemplate,
    })
        .then((msg) => console.log("msg: "+ msg));
    }
    //Sendgrid Data Requirements
    const msg = {
        to: [recipientEmail], 
        from: process.env.EMAIL,
        subject: "Dobrodošli na operateri.com!",
        html: htmlTemplate,
    }
    

    //Send Email to operators
    sgMail.send(msg)
    .then((msg) => console.log(msg));

     //Send Email to admins/regrutors
     /*sgMail.send(msg2)
     .then((msg2) => console.log(msg2));*/
 
}

export async function companyRegistrationEmail(email,
    username,
    name,
    lastname,
    cellphone,
    companyname,
    mb,){
        
    let htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <body style="text-align:center">
            <h1>Dobrodošli na operateri.com!</h1>
            <a href="https://operateri.com">
            <img src="http://cdn.mcauto-images-production.sendgrid.net/321854280de58ba3/98f9cee8-752e-497c-b0db-852ddc86f764/260x40.png" alt="HTML tutorial" style="width:30%;height:auto;border:0">
            </a>
            <p>Uspesno ste se registrovali!</br>
                Nakon što admin odobri pristup dobićete email sa lozinkom za pristup Vašem nalogu.
            </p>
            <h1>Vaši podaci:</h1>
            <p>Email: ${email}</p>
            <p>Ime: ${name}</p>
            <p>Prezime: ${lastname}</p>
            <p>Username: ${username}</p>
            <p>Mobilni telefon: ${cellphone}</p>
            <p>Ime kompanije: ${companyname}</p>
            <p>Maticni broj: ${mb}</p>

            </body>
            </html>
    `;
    
    const msg = {
        to: email, 
        from: process.env.EMAIL,
        subject: "Dobrodošli na operateri.com!",
        html: htmlTemplate,
    }
    let emails=await pool.query(knex('regruter').select('email').toString()+';')
    
    for(let i=0;i<emails.rowCount;i++){
        sgMail.send({
            to: emails.rows[i].email, 
            from: process.env.EMAIL,
            subject: "Stigao je novi zahtev",
            html: htmlTemplate,
    })
        .then((msg) => console.log("msg: "+ msg));
    }
    //Send Email
    sgMail.send(msg)
    .then((msg) => console.log(msg));

     //Uncomment when you get regrutor/admin email for sendd
    //  sgMail.send(msg2)
    //  .then((msg2) => console.log(msg2));
}

export async function newPasswordEmail(email,password){
        
    let htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <body>
            <body style="text-align:center">
            <h1>Dobrodošli na operateri.com!</h1>
            <a href="https://operateri.com">
            <img src="http://cdn.mcauto-images-production.sendgrid.net/321854280de58ba3/98f9cee8-752e-497c-b0db-852ddc86f764/260x40.png" alt="HTML tutorial" style="width:30%;height:auto;border:0">
            </a>
            <p>Poštovani,</br>
                Vaša registracija na operateri.com je prihvaćena.
                Od sada se možete ulogovati na platformu sa sledećim podacima:
            </p>
            <h1>Vaši podaci:</h1>
            <p>Email: ${email}</p>
            <p>Password: ${password}</p>

            </body>
            </html>
    `;
    //Sendgrid Data Requirements
    const msg = {
        to: email, 
        from: process.env.EMAIL,
        subject: "Vaš zahtev za članstvo je odobren!",
        html: htmlTemplate,
    }
    let emails=await pool.query(knex('regruter').select('email').toString()+';')
    
    for(let i=0;i<emails.rowCount;i++){
        sgMail.send({
            to: emails.rows[i].email, 
            from: process.env.EMAIL,
            subject: "Stigao je novi zahtev",
            html: htmlTemplate,
    })
        .then((msg) => console.log("msg: "+ msg));
    }

    //Send Email
    sgMail.send(msg)
    .then((msg) => console.log("msg: "+ msg));
}

let adminEmails=async function getRegruterAndAdminEmails(){
    
}