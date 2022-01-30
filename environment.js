
const environment={

}
environment.development= {
    env_Name : 'development',
    PORT:4000,
    secret_key:'nkjnadsfknfjkfa'
}

environment.production={
    env_Name : 'production',
    PORT:5000,
    secret_key:'jlkdkjafshkaklf'
}

const current_Environment = typeof(process.env.NODE_ENV)==='object' ? process.env.NODE_ENV : 'development';

const current_environment_object = typeof(environment[current_Environment])==='object' ? environment[current_Environment]:environment.development;



module.exports = current_environment_object;