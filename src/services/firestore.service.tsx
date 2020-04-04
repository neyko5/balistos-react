import { firestore, firebase } from '../config/firebase';

export function addVideoToPlaylist(
    playlistId: string,
    videoId: string,
    title: string
) {
    const currentUser = firebase.auth().currentUser;
    return firestore.collection(`playlists/${playlistId}/videos`).add({
        youtubeId: videoId,
        title,
        creator: {
            id: currentUser?.uid,
            name: currentUser?.displayName,
        },
    });
}

export function deleteVideoFromPlaylist(playlistId: string, id: string) {
    return firestore.doc(`playlists/${playlistId}/videos/${id}`).delete();
}

export function startVideo(playlistId: string, id: string) {
    return firestore.doc(`playlists/${playlistId}/videos/${id}`).update({
        started_at: new Date().getTime(),
    });
}

export function finishVideo(playlistId: string, id: string) {
    return firestore.doc(`playlists/${playlistId}/videos/${id}`).update({
        finished: true,
    });
}

export function toggleLikeVideo(
    playlistId: string,
    id: string,
    status: boolean
) {
    const currentUser = firebase.auth().currentUser;
    if (status) {
        return firestore.doc(`playlists/${playlistId}/videos/${id}`).update({
            likes: firebase.firestore.FieldValue.arrayRemove(currentUser?.uid),
        });
    } else {
        return firestore.doc(`playlists/${playlistId}/videos/${id}`).update({
            likes: firebase.firestore.FieldValue.arrayUnion(currentUser?.uid),
        });
    }
}

export function addChatToPlaylist(playlistId: string, message: string) {
    const currentUser = firebase.auth().currentUser;
    return firestore.collection(`playlists/${playlistId}/chats`).add({
        message,
        creator: {
            id: currentUser?.uid,
            name: currentUser?.displayName,
        },
        created_at: new Date().getTime(),
    });
}

export function createPlaylist(title: string, description: string) {
    const currentUser = firebase.auth().currentUser;
    return firestore.collection('playlists').add({
        title,
        description,
        creator: {
            name: currentUser?.displayName,
            id: currentUser?.uid,
        },
    });
}
