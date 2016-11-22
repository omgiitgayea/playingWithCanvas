/**
 * Created by GodaiYuusaku on 10/24/16.
 */
var storage = {
    local: {                                // local stays beyond the session closing
        set: setLocal,
        get: getLocal,
        remove: removeLocal
    },
    session: {
        set: setSession,
        get: getSession,
        remove: removeSession
    },
    clear: clearAll
};

function setLocal(objectName, object)
{
    window.localStorage.setItem(objectName, object);
}

function getLocal(objectName)
{
    return window.localStorage.getItem(objectName);
}

function setSession(objectName, object)
{
    window.sessionStorage.setItem(objectName, object);
}

function getSession(objectName)
{
    return window.sessionStorage.getItem(objectName);
}

function removeLocal(objectName)
{
    window.localStorage.removeItem(objectName);
}

function removeSession(objectName)
{
    window.sessionStorage.removeItem(objectName);
}

function clearAll()
{
    window.localStorage.clear();
    window.sessionStorage.clear();
}