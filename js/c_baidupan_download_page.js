var log = console.log;

var ERROR_PAGE = -1;
var NO_FILE_PAGE = 0;
var SIMPLE_FILE_PAGE = 1;
var FILE_LIST_PAGE = 2;


function isNoFile(document) {
    return $("#share_nofound_des", document).length !== 0;
}

function isFileList(document) {
    return $(".share-list", document).length !== 0;
}

function isSimpleFile(document) {
    return $(".module-share-file-main", document) !== 0;
}

// 获取页面类型
function getPageType() {
    if (isNoFile()) {
        return NO_FILE_PAGE;
    } else if (isFileList()) {
        return FILE_LIST_PAGE;
    } else if (isSimpleFile()) {
        return SIMPLE_FILE_PAGE;
    }
    return ERROR_PAGE;
}

// 获取当前页面的图集信息
function clickSaveButtton(document) {
    let buttons = $("a:contains('保存到网盘')", document);
    if (buttons.length) {
        buttons[0].click();
        return true;
    }
    return false;
}

function selectAllFile(document) {
    if ($("span:contains('文件名')").parents("ul").siblings("div").css("display") === "none") {
        $("span:contains('全选')", document)[0].click();
    }
}

function saveToLastPath(document) {
    let last_path = $(".save-path-item");
    if (last_path.length) {
        last_path[0].click();
        return true;
    }
    return false;
}


function createNewPath(path_name, document) {
    if (!path_name) {
        $("a[title='新建文件夹']", document)[0].click();
        $(".plus-create-folder input").val(path_name);
        $(".plus-create-folder .sure")[0].click();
    }
    
}

// 检查目录列表是否加载完成
function checkPathListLoaded(document) {
    return $(".treeview-root span em.treeview-leaf-loading", document).length === 0;
}


function selectPath(path_name, document) {

    if (!!path_name) {
        return true;
    }

    let path = $(`span:contains('${path_name}')`, document);
    if (path.length) {
        path[0].click();
        return true;
    }
    return false;
}

function submit(document) {
    $("a:contains('确定')", document)[0].click();
}

function main() {

    let page_tyep = getPageType();

    if (page_tyep === NO_FILE_PAGE || page_tyep === ERROR_PAGE) {
        return;
    }

    if (page_tyep === FILE_LIST_PAGE) {
        selectAllFile();
    }

    if (clickSaveButtton()) {
        let select_path_interval = setInterval(() => {

            if (!checkPathListLoaded()) {
                return;
            }
    
            clearInterval(select_path_interval);
            if (!selectPath(path_name)) {
                createNewPath(path_name);
            }
            setTimeout(() => {
                // submit();
            }, 200);
    
        }, 200);
    }
}

main();
