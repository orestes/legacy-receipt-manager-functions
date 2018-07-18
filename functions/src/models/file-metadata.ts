export interface FileMetadata {
    mimeType: string;
    lastViewedByMeDate: string;
    appDataContents: string;
    thumbnailLink: string;
    explicitlyTrashed: string;
    etag: string;
    lastModifyingUserName: string;
    writersCanShare: string;
    id: string;
    copyable: string;
    ownerNames: string;
    version: string;
    parents: string;
    shared: string;
    originalFilename: string;
    webContentLink: string;
    editable: string;
    kind: string;
    markedViewedByMeDate: string;
    fileExtension: string;
    fileSize: string;
    createdDate: string;
    md5Checksum: string;
    iconLink: string;
    embedLink: string;
    owners: string;
    alternateLink: string;
    title: string;
    modifiedByMeDate: string;
    downloadUrl: string;
    spaces: string;
    quotaBytesUsed: string;
    headRevisionId: string;
    selfLink: string;
    modifiedDate: string;
    userPermission: {
        kind: string;
        etag: string;
        role: string;
        type: string;
        id: string;
        selfLink: string;
    },
    labels: {
        restricted: string;
        hidden: string;
        viewed: string;
        starred: string;
        trashed: string;
    },
    lastModifyingUser: {
        picture: {
            url: string;
        },
        kind: string;
        displayName: string;
        permissionId: string;
        isAuthenticatedUser: string;
        emailAddress: string;
    },
    capabilities: {
        canCopy: string;
        canEdit: string;
    },
}
