#!/bin/bash
#
# V1.0.0
# 2022.02.28
#
# 将 import <> 替换为 import ""

function replaceHeaderFile() {
    echo $1
    echo "1111111"

    sed -i "" 's|<DZNEmptyDataSet/UIScrollView+EmptyDataSet.h>|\"UIScrollView+EmptyDataSet.h\"|g' $1
    sed -i "" 's|<Masonry/Masonry.h>|\"Masonry.h\"|g' $1
    sed -i "" 's|<MJExtension/MJExtension.h>|\"MJExtension.h\"|g' $1
    sed -i "" 's|<AFNetworking/AFNetworking.h>|\"AFNetworking.h\"|g' $1
    sed -i "" 's|<SDWebImage/UIImageView+WebCache.h>|\"UIImageView+WebCache.h\"|g' $1
    sed -i "" 's|<SDWebImage/SDWebImageManager.h>|\"SDWebImageManager.h\"|g' $1
    sed -i "" 's|<MJRefresh/MJRefresh.h>|\"MJRefresh.h\"|g' $1
    
    sed -i "" 's|<FSCalendar/FSCalendar.h>|\"FSCalendar.h\"|g' $1
    sed -i "" 's|<zhPopupController/zhPopupController.h>|\"zhPopupController.h\"|g' $1
    sed -i "" 's|<QYCTFHpple/TFHpple.h>|\"TFHpple.h\"|g' $1

    sed -i "" 's|<QYCAccount/Account.h>|\"Account.h\"|g' $1
    sed -i "" 's|<QYCAccount/AccountTool.h>|\"AccountTool.h\"|g' $1
    sed -i "" 's|<QYCNetwork/NET.h>|\"NET.h\"|g' $1

    sed -i "" 's|<YYCategories/YYCategoriesMacro.h>|\"YYCategoriesMacro.h\"|g' $1
    sed -i "" 's|<YYCategories/NSTimer+YYAdd.h>|\"NSTimer+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/NSArray+YYAdd.h>|\"NSArray+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/UIColor+YYAdd.h>|\"UIColor+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/NSDictionary+YYAdd.h>|\"NSDictionary+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/NSString+YYAdd.h>|\"NSString+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/NSDate+YYAdd.h>|\"NSDate+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/UIDevice+YYAdd.h>|\"UIDevice+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/UITableView+YYAdd.h>|\"UITableView+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/UIScrollView+YYAdd.h>|\"UIScrollView+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/UIView+YYAdd.h>|\"UIView+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/UIImage+YYAdd.h>|\"UIImage+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/UIGestureRecognizer+YYAdd.h>|\"UIGestureRecognizer+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCategories/NSBundle+YYAdd.h>|\"NSBundle+YYAdd.h\"|g' $1
    sed -i "" 's|<YYCache/YYDiskCache.h>|\"YYDiskCache.h\"|g' $1
    sed -i "" 's|<YYCache/YYCache.h>|\"YYCache.h\"|g' $1

    sed -i "" 's|<QYCCategory/UIButton+Item.h>|\"UIButton+Item.h\"|g' $1
    sed -i "" 's|<QYCCategory/NSString+Regular.h>|\"NSString+Regular.h\"|g' $1
    sed -i "" 's|<QYCCategory/UIImage+Image.h>|\"UIImage+Image.h\"|g' $1
    sed -i "" 's|<QYCCategory/UIColor+QYCColor.h>|\"UIColor+QYCColor.h\"|g' $1
    sed -i "" 's|<QYCCategory/NSString+QYDateString.h>|\"NSString+QYDateString.h\"|g' $1
    sed -i "" 's|<QYCCategory/NSBundle+QYCBundle.h>|\"NSBundle+QYCBundle.h\"|g' $1
    sed -i "" 's|<QYCCategory/NSString+HTML.h>|\"NSString+HTML.h\"|g' $1
    sed -i "" 's|<QYCCategory/UIBarButtonItem+Item.h>|\"UIBarButtonItem+Item.h\"|g' $1
    sed -i "" 's|<QYCCategory/UIView+RoundCorner.h>|\"UIView+RoundCorner.h\"|g' $1
    sed -i "" 's|<QYCCategory/UIStackView+QYCExtesion.h>|\"UIStackView+QYCExtesion.h\"|g' $1
    sed -i "" 's|<QYCCategory/NSMutableArray+FilterElement.h>|\"NSMutableArray+FilterElement.h\"|g' $1
    sed -i "" 's|<QYCCategory/UIButton+QYCVerticalLayout.h>|\"UIButton+QYCVerticalLayout.h\"|g' $1
    sed -i "" 's|<QYCCategory/UILabel+QYCDynamicHeight.h>|\"UILabel+QYCDynamicHeight.h\"|g' $1
    sed -i "" 's|<QYCCategory/UIViewController+QYCCurrentVC.h>|\"UIViewController+QYCCurrentVC.h\"|g' $1
    sed -i "" 's|<QYCCategory/NSString+Byte.h>|\"NSString+Byte.h\"|g' $1
    sed -i "" 's|<QYCCategory/UITextView+Placeholder.h>|\"UITextView+Placeholder.h\"|g' $1
    sed -i "" 's|<QYCCategory/NSString+QYCStringExtension.h>|\"NSString+QYCStringExtension.h\"|g' $1
    sed -i "" 's|<QYCCategory/NSString+QYCSizeToFit.h>|\"NSString+QYCSizeToFit.h\"|g' $1

    sed -i "" 's|<YYText/NSAttributedString+YYText.h>|\"NSAttributedString.h\"|g' $1
    sed -i "" 's|<YYText/YYTextAttribute.h>|\"YYTextAttribute.h\"|g' $1
    sed -i "" 's|<YYText/YYTextView.h>|\"YYTextView.h\"|g' $1
    sed -i "" 's|<YYText/YYLabel.h>|\"YYLabel.h\"|g' $1

    sed -i "" 's|<QYCTZImagePickerController/TZImagePickerController.h>|\"TZImagePickerController.h\"|g' $1
    sed -i "" 's|<QYCTZImagePickerController/TZImageManager.h>|\"TZImageManager.h\"|g' $1
    sed -i "" 's|<QYCYYPhotoGroupView/YYPhotoGroupView.h>|\"YYPhotoGroupView.h\"|g' $1
    sed -i "" 's|<QYCVoice/iflyTool.h>|\"iflyTool.h\"|g' $1

    sed -i "" 's|<QYCCLImageEditor/CLImageEditor.h>|\"CLImageEditor.h\"|g' $1

    sed -i "" 's|<QYCPinYin/ChineseInclude.h>|\"ChineseInclude.h\"|g' $1
    sed -i "" 's|<QYCPinYin/PinYinForObjc.h>|\"PinYinForObjc.h\"|g' $1

    sed -i "" 's|<QYCYBImageBrowser/QYCYBImageBrowser.h>|\"QYCYBImageBrowser.h\"|g' $1
    sed -i "" 's|<QYCEntContainer/NSObject+QYCExtensionEntId.h>|\"NSObject+QYCExtensionEntId.h\"|g' $1
    sed -i "" 's|<QYCCMPopTipView/CMPopTipView.h>|\"CMPopTipView.h\"|g' $1

    sed -i "" 's|<QYCNavigationExtension/UINavigationController+JZExtension.h>|\"UINavigationController+JZExtension.h\"|g' $1
    sed -i "" 's|<QYCNavigationExtension/JZNavigationExtension.h>|\"JZNavigationExtension.h\"|g' $1
    sed -i "" 's|<QYCNavigationExtension/UIViewController+JZExtension.h>|\"UIViewController+JZExtension.h\"|g' $1

    sed -i "" 's|<QYCProfileModule_Category/CTMediator+Profile.h>|\"CTMediator+Profile.h\"|g' $1
    sed -i "" 's|<QYCH5Module_Category/CTMediator+WebBridge.h>|\"CTMediator+WebBridge.h\"|g' $1
    sed -i "" 's|<QYCApplicationCenterModule_Category/CTMediator+QYCApplicationCenterModuleActions.h>|\"CTMediator+QYCApplicationCenterModuleActions.h\"|g' $1
    sed -i "" 's|<QYCQChatModule_Category/CTMediator+QChat.h>|\"CTMediator+QChat.h\"|g' $1
    sed -i "" 's|<QYCOrgStructureModule_Category/CTMediator+OrgAndRoleGroup.h>|\"CTMediator+OrgAndRoleGroup.h\"|g' $1
    sed -i "" 's|<QYCWorkCircleModule_Category/CTMediator+QYCWorkCircleModuleActions.h>|\"CTMediator+QYCWorkCircleModuleActions.h\"|g' $1
    sed -i "" 's|<QYCSystemErrorModule_Category/CTMediator+informationReminder.h>|\"CTMediator+informationReminder.h\"|g' $1
    sed -i "" 's|<QYCFormModule_Category/CTMediator+FormDetailModule.h>|\"CTMediator+FormDetailModule.h\"|g' $1
    sed -i "" 's|<QYCMapModule_Category/CTMediator+QYCMap.h>|\"CTMediator+QYCMap.h\"|g' $1
    sed -i "" 's|<QYCFilePreviewModule_Category/CTMediator+QYCFilePreviewModuleActions.h>|\"CTMediator+PlatformRemindsModule.h\"|g' $1
    sed -i "" 's|<QYCPlatformRemindsModule_Category/CTMediator+PlatformRemindsModule.h>|\"CTMediator+PlatformRemindsModule.h\"|g' $1
    sed -i "" 's|<QYCQRCodeModule_Category/CTMediator+QYCQRCodeModuleActions.h>|\"CTMediator+QYCQRCodeModuleActions.h\"|g' $1
    sed -i "" 's|<QYCRootModule_Category/CTMediator+QYCRootModuleActions.h>|\"CTMediator+QYCRootModuleActions.h\"|g' $1
    sed -i "" 's|<QYCLoginModule_Category/CTMediator+QYCLoginModuleActions.h>|\"CTMediator+QYCLoginModuleActions.h\"|g' $1
    sed -i "" 's|<QYCPortalModule_Category/CTMediator+Portal.h>|\"CTMediator+Portal.h\"|g' $1
    sed -i "" 's|<QYCSigninModule_Category/CTMediator+Signin.h>|\"CTMediator+Signin.h\"|g' $1
    sed -i "" 's|<QYCIOTModule_Category/CTMediator+QYCIOTModuleActions.h>|\"CTMediator+QYCIOTModuleActions.h\"|g' $1
    sed -i "" 's|<QYCCuteHandModule_Category/CTMediator+CuteHandModule.h>|\"CTMediator+CuteHandModule.h\"|g' $1
    sed -i "" 's|<QYCBlueToothModule_Category/CTMediator+QYCBlueToothModuleActions.h>|\"CTMediator+QYCBlueToothModuleActions.h\"|g' $1
    sed -i "" 's|<QYCFlutterModule_Category/CTMediator+FlutterModuleActions.h>|\"CTMediator+FlutterModuleActions.h\"|g' $1
}

# 获取指定目录下所有的文件，默认为当前目录
main() {
    filelist=`find . -name "*.[hm]" -depth`
    for i in $filelist
    do
        echo $i
        replaceHeaderFile $i
    done
}

# 执行
main


# # 或者
# function getdir() {
#     for element in `ls $1`
#     do
#         dir_or_file=$1"/"$element
#         if [ -d $dir_or_file ]
#         then
#             getdir $dir_or_file
#         else
#             replaceHeaderFile $dir_or_file
#         fi
#     done
# }

# getdir .



# 方法二
#find . -name "*.[hm]" -depth | xargs perl -pi -e 's|\"YYCache.h\"|<YYCache/YYCache.h>|g'

# sed -i "" 's|\"UIScrollView+EmptyDataSet.h\"|<DZNEmptyDataSet/UIScrollView+EmptyDataSet.h>|g' $1
# sed -i "" 's|\"Masonry.h\"|<Masonry/Masonry.h>|g' $1
# sed -i "" 's|\"MJExtension.h\"|<MJExtension/MJExtension.h>|g' $1
# sed -i "" 's|\"AFNetworking.h\"|<AFNetworking/AFNetworking.h>|g' $1
# sed -i "" 's|\"UIImageView+WebCache.h\"|<SDWebImage/UIImageView+WebCache.h>|g' $1
# sed -i "" 's|\"SDWebImageManager.h\"|<SDWebImage/SDWebImageManager.h>|g' $1
# sed -i "" 's|\"MJRefresh.h\"|<MJRefresh/MJRefresh.h>|g' $1

# sed -i "" 's|\"FSCalendar.h\"|<FSCalendar/FSCalendar.h>|g' $1
# sed -i "" 's|\"zhPopupController.h\"|<zhPopupController/zhPopupController.h>|g' $1
# sed -i "" 's|\"TFHpple.h\"|<QYCTFHpple/TFHpple.h>|g' $1

# sed -i "" 's|\"Account.h\"|<QYCAccount/Account.h>|g' $1
# sed -i "" 's|\"AccountTool.h\"|<QYCAccount/AccountTool.h>|g' $1
# sed -i "" 's|\"NET.h\"|<QYCNetwork/NET.h>|g' $1

# sed -i "" 's|\"YYCategoriesMacro.h\"|<YYCategories/YYCategoriesMacro.h>|g' $1
# sed -i "" 's|\"NSTimer+YYAdd.h\"|<YYCategories/NSTimer+YYAdd.h>|g' $1
# sed -i "" 's|\"NSArray+YYAdd.h\"|<YYCategories/NSArray+YYAdd.h>|g' $1
# sed -i "" 's|\"UIColor+YYAdd.h\"|<YYCategories/UIColor+YYAdd.h>|g' $1
# sed -i "" 's|\"NSDictionary+YYAdd.h\"|<YYCategories/NSDictionary+YYAdd.h>|g' $1
# sed -i "" 's|\"NSString+YYAdd.h\"|<YYCategories/NSString+YYAdd.h>|g' $1
# sed -i "" 's|\"NSDate+YYAdd.h\"|<YYCategories/NSDate+YYAdd.h>|g' $1
# sed -i "" 's|\"UIDevice+YYAdd.h\"|<YYCategories/UIDevice+YYAdd.h>|g' $1
# sed -i "" 's|\"UITableView+YYAdd.h\"|<YYCategories/UITableView+YYAdd.h>|g' $1
# sed -i "" 's|\"UIScrollView+YYAdd.h\"|<YYCategories/UIScrollView+YYAdd.h>|g' $1
# sed -i "" 's|\"UIView+YYAdd.h\"|<YYCategories/UIView+YYAdd.h>|g' $1
# sed -i "" 's|\"UIImage+YYAdd.h\"|<YYCategories/UIImage+YYAdd.h>|g' $1
# sed -i "" 's|\"UIGestureRecognizer+YYAdd.h\"|<YYCategories/UIGestureRecognizer+YYAdd.h>|g' $1
# sed -i "" 's|\"NSBundle+YYAdd.h\"|<YYCategories/NSBundle+YYAdd.h>|g' $1
# sed -i "" 's|\"YYDiskCache.h\"|<YYCache/YYDiskCache.h>|g' $1
# sed -i "" 's|\"YYCache.h\"|<YYCache/YYCache.h>|g' $1

# sed -i "" 's|\"UIButton+Item.h\"|<QYCCategory/UIButton+Item.h>|g' $1
# sed -i "" 's|\"NSString+Regular.h\"|<QYCCategory/NSString+Regular.h>|g' $1
# sed -i "" 's|\"UIImage+Image.h\"|<QYCCategory/UIImage+Image.h>|g' $1
# sed -i "" 's|\"UIColor+QYCColor.h\"|<QYCCategory/UIColor+QYCColor.h>|g' $1
# sed -i "" 's|\"NSString+QYDateString.h\"|<QYCCategory/NSString+QYDateString.h>|g' $1
# sed -i "" 's|\"NSBundle+QYCBundle.h\"|<QYCCategory/NSBundle+QYCBundle.h>|g' $1
# sed -i "" 's|\"NSString+HTML.h\"|<QYCCategory/NSString+HTML.h>|g' $1
# sed -i "" 's|\"UIBarButtonItem+Item.h\"|<QYCCategory/UIBarButtonItem+Item.h>|g' $1
# sed -i "" 's|\"UIView+RoundCorner.h\"|<QYCCategory/UIView+RoundCorner.h>|g' $1
# sed -i "" 's|\"UIStackView+QYCExtesion.h\"|<QYCCategory/UIStackView+QYCExtesion.h>|g' $1
# sed -i "" 's|\"NSMutableArray+FilterElement.h\"|<QYCCategory/NSMutableArray+FilterElement.h>|g' $1
# sed -i "" 's|\"UIButton+QYCVerticalLayout.h\"|<QYCCategory/UIButton+QYCVerticalLayout.h>|g' $1
# sed -i "" 's|\"UILabel+QYCDynamicHeight.h\"|<QYCCategory/UILabel+QYCDynamicHeight.h>|g' $1
# sed -i "" 's|\"UIViewController+QYCCurrentVC.h\"|<QYCCategory/UIViewController+QYCCurrentVC.h>|g' $1
# sed -i "" 's|\"NSString+Byte.h\"|<QYCCategory/NSString+Byte.h>|g' $1
# sed -i "" 's|\"UITextView+Placeholder.h\"|<QYCCategory/UITextView+Placeholder.h>|g' $1
# sed -i "" 's|\"NSString+QYCStringExtension.h\"|<QYCCategory/NSString+QYCStringExtension.h>|g' $1
# sed -i "" 's|\"NSString+QYCSizeToFit.h\"|<QYCCategory/NSString+QYCSizeToFit.h>|g' $1

# sed -i "" 's|\"NSAttributedString.h\"|<YYText/NSAttributedString+YYText.h>|g' $1
# sed -i "" 's|\"YYTextAttribute.h\"|<YYText/YYTextAttribute.h>|g' $1
# sed -i "" 's|\"YYTextView.h\"|<YYText/YYTextView.h>|g' $1
# sed -i "" 's|\"YYLabel.h\"|<YYText/YYLabel.h>|g' $1

# sed -i "" 's|\"TZImagePickerController.h\"|<QYCTZImagePickerController/TZImagePickerController.h>|g' $1
# sed -i "" 's|\"TZImageManager.h\"|<QYCTZImagePickerController/TZImageManager.h>|g' $1
# sed -i "" 's|\"YYPhotoGroupView.h\"|<QYCYYPhotoGroupView/YYPhotoGroupView.h>|g' $1
# sed -i "" 's|\"iflyTool.h\"|<QYCVoice/iflyTool.h>|g' $1

# sed -i "" 's|\"CLImageEditor.h\"|<QYCCLImageEditor/CLImageEditor.h>|g' $1

# sed -i "" 's|\"ChineseInclude.h\"|<QYCPinYin/ChineseInclude.h>|g' $1
# sed -i "" 's|\"PinYinForObjc.h\"|<QYCPinYin/PinYinForObjc.h>|g' $1

# sed -i "" 's|\"QYCYBImageBrowser.h\"|<QYCYBImageBrowser/QYCYBImageBrowser.h>|g' $1
# sed -i "" 's|\"NSObject+QYCExtensionEntId.h\"|<QYCEntContainer/NSObject+QYCExtensionEntId.h>|g' $1
# sed -i "" 's|\"CMPopTipView.h\"|<QYCCMPopTipView/CMPopTipView.h>|g' $1

# sed -i "" 's|\"UINavigationController+JZExtension.h\"|<QYCNavigationExtension/UINavigationController+JZExtension.h>|g' $1
# sed -i "" 's|\"JZNavigationExtension.h\"|<QYCNavigationExtension/JZNavigationExtension.h>|g' $1
# sed -i "" 's|\"UIViewController+JZExtension.h\"|<QYCNavigationExtension/UIViewController+JZExtension.h>|g' $1

# sed -i "" 's|\"CTMediator+Profile.h\"|<QYCProfileModule_Category/CTMediator+Profile.h>|g' $1
# sed -i "" 's|\"CTMediator+WebBridge.h\"|<QYCH5Module_Category/CTMediator+WebBridge.h>|g' $1
# sed -i "" 's|\"CTMediator+QYCApplicationCenterModuleActions.h\"|<QYCApplicationCenterModule_Category/CTMediator+QYCApplicationCenterModuleActions.h>|g' $1
# sed -i "" 's|\"CTMediator+QChat.h\"|<QYCQChatModule_Category/CTMediator+QChat.h>|g' $1
# sed -i "" 's|\"CTMediator+OrgAndRoleGroup.h\"|<QYCOrgStructureModule_Category/CTMediator+OrgAndRoleGroup.h>|g' $1
# sed -i "" 's|\"CTMediator+QYCWorkCircleModuleActions.h\"|<QYCWorkCircleModule_Category/CTMediator+QYCWorkCircleModuleActions.h>|g' $1
# sed -i "" 's|\"CTMediator+informationReminder.h\"|<QYCSystemErrorModule_Category/CTMediator+informationReminder.h>|g' $1
# sed -i "" 's|\"CTMediator+FormDetailModule.h\"|<QYCFormModule_Category/CTMediator+FormDetailModule.h>|g' $1
# sed -i "" 's|\"CTMediator+QYCMap.h\"|<QYCMapModule_Category/CTMediator+QYCMap.h>|g' $1
# sed -i "" 's|\"CTMediator+PlatformRemindsModule.h\"|<QYCFilePreviewModule_Category/CTMediator+QYCFilePreviewModuleActions.h>|g' $1
# sed -i "" 's|\"CTMediator+PlatformRemindsModule.h\"|<QYCPlatformRemindsModule_Category/CTMediator+PlatformRemindsModule.h>|g' $1
# sed -i "" 's|\"CTMediator+QYCQRCodeModuleActions.h\"|<QYCQRCodeModule_Category/CTMediator+QYCQRCodeModuleActions.h>|g' $1
# sed -i "" 's|\"CTMediator+QYCRootModuleActions.h\"|<QYCRootModule_Category/CTMediator+QYCRootModuleActions.h>|g' $1
# sed -i "" 's|\"CTMediator+QYCLoginModuleActions.h\"|<QYCLoginModule_Category/CTMediator+QYCLoginModuleActions.h>|g' $1
# sed -i "" 's|\"CTMediator+Portal.h\"|<QYCPortalModule_Category/CTMediator+Portal.h>|g' $1
# sed -i "" 's|\"CTMediator+Signin.h\"|<QYCSigninModule_Category/CTMediator+Signin.h>|g' $1
# sed -i "" 's|\"CTMediator+QYCIOTModuleActions.h\"|<QYCIOTModule_Category/CTMediator+QYCIOTModuleActions.h>|g' $1
# sed -i "" 's|\"CTMediator+CuteHandModule.h\"|<QYCCuteHandModule_Category/CTMediator+CuteHandModule.h>|g' $1
# sed -i "" 's|\"CTMediator+QYCBlueToothModuleActions.h\"|<QYCBlueToothModule_Category/CTMediator+QYCBlueToothModuleActions.h>|g' $1
# sed -i "" 's|\"CTMediator+FlutterModuleActions.h\"|<QYCFlutterModule_Category/CTMediator+FlutterModuleActions.h>|g' $1


