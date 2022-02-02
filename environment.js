
const environment={

}
environment.development= {
    env_Name : 'development',
    PORT:4000,
    secret_key:'nkjnadsfknfjkfa',
    max_check_key:6,
    env_twilio : {
        fromNumber: '+16175551212',
        account_sid : 'AC823258684448ae87e689ac9f66eb5f13',
        auth_token : 'c8aaf1321f47bffb1fbd010cc512f5c9'
    }
}

environment.production={
    env_Name : 'production',
    PORT:5000,
    secret_key:'jlkdkjafshkaklf',
    env_twilio : {
        fromNumber: '+16175551212',
        account_sid : 'AC823258684448ae87e689ac9f66eb5f13',
        auth_token : 'c8aaf1321f47bffb1fbd010cc512f5c9'
    }
}

const current_Environment = typeof(process.env.NODE_ENV)==='object' ? process.env.NODE_ENV : 'development';

const current_environment_object = typeof(environment[current_Environment])==='object' ? environment[current_Environment]:environment.development;



module.exports = current_environment_object;