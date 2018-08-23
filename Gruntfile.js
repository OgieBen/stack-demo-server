// let grunt = require("load-grunt-tasks"); //(grunt); 
module.exports = function(grunt){

    require("load-grunt-tasks")(grunt);

        grunt.initConfig({
            babel: {
                options: {
                    sourceMap: true,
                    presets: ['env'],
                },
            
                dist: {
        
                    files: [{
                        expand: true,
                        src: ["app/prod/**/*.js"],
                        dest: "app/dist",
                        ext: ".js",
                       
                    }],
                    

                }
            },

            exec: {
                node: {cmd: "node app/bin/www"}
            }
        });
        
        //   grunt.loadNpmTasks('load-grunt-tasks');
        
        grunt.registerTask("default", ["babel", ]);
}
