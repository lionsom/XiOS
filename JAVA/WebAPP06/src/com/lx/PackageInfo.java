package com.lx;

public class PackageInfo {
    String name = "";
    String icon = "";
    String branch = "";
    String env = "";
    String install = "";
    String platform = "";
    String create_by = "";
    String create_at = "";
    String testUser = "";


    public PackageInfo(String name, String icon, String branch, String env, String install, String platform, String create_by, String create_at, String testUser) {
        this.name = name;
        this.icon = icon;
        this.branch = branch;
        this.env = env;
        this.install = install;
        this.platform = platform;
        this.create_by = create_by;
        this.create_at = create_at;
        this.testUser = testUser;
    }
}
