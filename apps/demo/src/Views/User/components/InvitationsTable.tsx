import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { InvitationsTable } from "@prefabs.tech/react-user";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";
import { invitations } from "./data";

export const InvitationsTableDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  const isExpired = (date?: Date | number | string) => {
    return !!(date && new Date(date) < new Date());
  };

  return (
    <Page
      title={t("invitationsTable.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section>
        <InvitationsTable
          appFilterOptions={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
          ]}
          columns={[
            {
              accessorKey: "appId",
              filterFn: (row, columnId, filterValue) => {
                if (!filterValue || filterValue.length === 0) {
                  return true;
                }

                const updatedFilterValue = filterValue.map((value: string) => {
                  switch (value) {
                    case "1":
                      return 1;
                    case "2":
                      return 2;
                    default:
                      return 3;
                  }
                });

                return updatedFilterValue.includes(row.original.appId);
              },
            },
            {
              accessorKey: "invitedBy",
              maxWidth: "20rem",
              minWidth: "20rem",
              width: "20rem",
            },
            {
              accessorKey: "status",
              filterFn: (row, columnId, filterValue) => {
                if (!filterValue || filterValue.length === 0) {
                  return true;
                }

                const { acceptedAt, expiresAt, revokedAt } = row.original;

                const getCellValue = () => {
                  if (acceptedAt) {
                    return "accepted";
                  }

                  if (revokedAt) {
                    return "revoked";
                  }

                  if (isExpired(expiresAt)) {
                    return "expired";
                  }

                  return "pending";
                };

                return filterValue.includes(getCellValue());
              },
            },
          ]}
          id="invitation-table"
          initialSorting={[{ desc: false, id: "email" }]}
          invitations={invitations}
          onInvitationAdded={() => {}}
          roleFilterOptions={[
            { label: "ADMIN", value: "ADMIN" },
            { label: "SUPERADMIN", value: "SUPERADMIN" },
            { label: "USER", value: "USER" },
          ]}
          statusFilterOptions={[
            { label: "Accepted", value: "accepted" },
            { label: "Expired", value: "expired" },
            { label: "Pending", value: "pending" },
            { label: "Revoked", value: "revoked" },
          ]}
        />
      </Section>
    </Page>
  );
};
