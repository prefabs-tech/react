import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { InvitationsTable } from "@prefabs.tech/react-user";
import { useNavigate } from "react-router-dom";

import { invitations } from "./data";
import { Section } from "../../../components/Demo";

export const InvitationsTableDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  const isExpired = (date?: string | Date | number) => {
    return !!(date && new Date(date) < new Date());
  };

  return (
    <Page
      title={t("invitationsTable.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <InvitationsTable
          appFilterOptions={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
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

                const { acceptedAt, revokedAt, expiresAt } = row.original;

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
          initialSorting={[{ id: "email", desc: false }]}
          invitations={invitations}
          onInvitationAdded={() => {}}
          roleFilterOptions={[
            { value: "ADMIN", label: "ADMIN" },
            { value: "SUPERADMIN", label: "SUPERADMIN" },
            { value: "USER", label: "USER" },
          ]}
          statusFilterOptions={[
            { value: "accepted", label: "Accepted" },
            { value: "expired", label: "Expired" },
            { value: "pending", label: "Pending" },
            { value: "revoked", label: "Revoked" },
          ]}
          id="invitation-table"
          persistState
        />
      </Section>
    </Page>
  );
};
