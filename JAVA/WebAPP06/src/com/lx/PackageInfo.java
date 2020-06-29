package com.lx;

public class PackageInfo {
    String createAt = "";
    String bundleName = "";
    String currentVersion = "";
    String appId = "";
    String appName = "";
    String icon = "";
    String branch = "";
    String env = "";
    String install = "";
    String platform = "";
    String developer = "";
    String testUser = "";

    public PackageInfo(String createAt, String bundleName, String currentVersion, String appId, String appName, String icon, String branch, String env, String install, String platform, String developer, String testUser) {
        this.createAt = createAt;
        this.bundleName = bundleName;
        this.currentVersion = currentVersion;
        this.appId = appId;
        this.appName = appName;
        this.icon = icon;
        this.branch = branch;
        this.env = env;
        this.install = install;
        this.platform = platform;
        this.developer = developer;
        this.testUser = testUser;
    }
}
